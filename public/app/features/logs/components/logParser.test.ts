import { FieldType, MutableDataFrame } from '@grafana/data';
import { ExploreFieldLinkModel } from 'app/features/explore/utils/links';

import { createLogRow } from './__mocks__/logRow';
import { getAllFields, createLogLineLinks, FieldDef } from './logParser';

describe('logParser', () => {
  describe('getAllFields', () => {
    it('should filter out fields with data links that have a nullish value', () => {
      const createScenario = (value: unknown) =>
        createLogRow({
          entryFieldIndex: 1,
          rowIndex: 0,
          dataFrame: {
            refId: 'A',
            fields: [
              testTimeField,
              testLineField,
              {
                name: 'link',
                type: FieldType.string,
                config: {
                  links: [
                    {
                      title: 'link1',
                      url: 'https://example.com',
                    },
                  ],
                },
                values: [value],
              },
            ],
            length: 1,
          },
        });

      expect(getAllFields(createScenario(null))).toHaveLength(0);
      expect(getAllFields(createScenario(undefined))).toHaveLength(0);
      expect(getAllFields(createScenario(''))).toHaveLength(1);
      expect(getAllFields(createScenario('test'))).toHaveLength(1);
      // technically this is a field-type-string, but i will add more
      // falsy-values, just to be sure
      expect(getAllFields(createScenario(false))).toHaveLength(1);
      expect(getAllFields(createScenario(NaN))).toHaveLength(1);
      expect(getAllFields(createScenario(0))).toHaveLength(1);
      expect(getAllFields(createScenario(-0))).toHaveLength(1);
    });

    it('should filter out field with labels name old-loki-style frame', () => {
      const logRow = createLogRow({
        entryFieldIndex: 1,
        dataFrame: new MutableDataFrame({
          meta: {
            custom: {
              frameType: 'LabeledTimeValues',
            },
          },
          refId: 'A',
          fields: [
            testTimeField,
            testLineField,
            testStringField,
            {
              name: 'labels',
              type: FieldType.other,
              config: {},
              values: [{ place: 'luna', source: 'data' }],
            },
          ],
        }),
      });

      const fields = getAllFields(logRow);
      expect(fields.length).toBe(1);
      expect(fields.find((field) => field.keys[0] === 'labels')).toBe(undefined);
    });

    it('should not filter out field with labels name in not-old-loki-style frame', () => {
      const logRow = createLogRow({
        entryFieldIndex: 1,
        dataFrame: new MutableDataFrame({
          refId: 'A',
          fields: [
            testTimeField,
            testLineField,
            testStringField,
            {
              name: 'labels',
              type: FieldType.string,
              config: {},
              values: [{ place: 'luna', source: 'data' }],
            },
          ],
        }),
      });
      const fields = getAllFields(logRow);
      expect(fields.length).toBe(2);
      expect(fields.find((field) => field.keys[0] === 'labels')).not.toBe(undefined);
    });

    it('should not filter out field with labels name and other type and datalinks', () => {
      const logRow = createLogRow({
        entryFieldIndex: 1,
        dataFrame: new MutableDataFrame({
          refId: 'A',
          fields: [
            testTimeField,
            testLineField,
            testStringField,
            {
              name: 'labels',
              type: FieldType.other,
              config: {
                links: [
                  {
                    title: 'test1',
                    url: 'url1',
                  },
                ],
              },
              values: [{ place: 'luna', source: 'data' }],
            },
          ],
        }),
      });
      const fields = getAllFields(logRow);
      expect(fields.length).toBe(2);
      expect(fields.find((field) => field.keys[0] === 'labels')).not.toBe(undefined);
    });

    it('should filter out field with id name', () => {
      const logRow = createLogRow({
        entryFieldIndex: 1,
        dataFrame: new MutableDataFrame({
          refId: 'A',
          fields: [
            testTimeField,
            testLineField,
            testStringField,
            {
              name: 'id',
              type: FieldType.string,
              config: {},
              values: ['1659620138401000000_8b1f7688_'],
            },
          ],
        }),
      });

      const fields = getAllFields(logRow);
      expect(fields.length).toBe(1);
      expect(fields.find((field) => field.keys[0] === 'id')).toBe(undefined);
    });

    it('should filter out field with config hidden field', () => {
      const testField = { ...testStringField };
      testField.config = {
        custom: {
          hidden: true,
        },
      };
      const logRow = createLogRow({
        entryFieldIndex: 10,
        dataFrame: new MutableDataFrame({
          refId: 'A',
          fields: [testTimeField, testLineField, { ...testField }],
        }),
      });

      const fields = getAllFields(logRow);
      expect(fields.length).toBe(0);
      expect(fields.find((field) => field.keys[0] === testField.name)).toBe(undefined);
    });

    it('should filter out field with null values', () => {
      const logRow = createLogRow({
        entryFieldIndex: 10,
        dataFrame: new MutableDataFrame({
          refId: 'A',
          fields: [testTimeField, testLineField, { ...testFieldWithNullValue }],
        }),
      });

      const fields = getAllFields(logRow);
      expect(fields.length).toBe(0);
      expect(fields.find((field) => field.keys[0] === testFieldWithNullValue.name)).toBe(undefined);
    });

    it('should not filter out field with string values', () => {
      const logRow = createLogRow({
        entryFieldIndex: 1,
        dataFrame: new MutableDataFrame({
          refId: 'A',
          fields: [testTimeField, testLineField, { ...testStringField }],
        }),
      });

      const fields = getAllFields(logRow);
      expect(fields.length).toBe(1);
      expect(fields.find((field) => field.keys[0] === testStringField.name)).not.toBe(undefined);
    });
  });

  describe('createLogLineLinks', () => {
    it('should change FieldDef to have keys of variable keys', () => {
      const variableLink: ExploreFieldLinkModel = {
        href: 'test',
        onClick: () => {},
        origin: {
          config: { links: [] },
          name: 'Line',
          type: FieldType.string,
          values: ['a', 'b'],
        },
        title: 'test',
        target: '_self',
        variables: [
          { variableName: 'path', value: 'test', match: '${path}', found: true },
          { variableName: 'msg', value: 'test msg', match: '${msg}', found: true },
        ],
      };

      const fieldWithVarLink: FieldDef = {
        fieldIndex: 2,
        keys: ['Line'],
        values: ['level=info msg="test msg" status_code=200 url=http://test'],
        links: [variableLink],
      };

      const fields = createLogLineLinks([fieldWithVarLink]);
      expect(fields.length).toBe(1);
      expect(fields[0].keys.length).toBe(2);
      expect(fields[0].keys[0]).toBe('path');
      expect(fields[0].values[0]).toBe('test');
      expect(fields[0].keys[1]).toBe('msg');
      expect(fields[0].values[1]).toBe('test msg');
    });

    it('should return empty array if no variables', () => {
      const variableLink: ExploreFieldLinkModel = {
        href: 'test',
        onClick: () => {},
        origin: {
          config: { links: [] },
          name: 'Line',
          type: FieldType.string,
          values: ['a', 'b'],
        },
        title: 'test',
        target: '_self',
      };

      const fieldWithVarLink: FieldDef = {
        fieldIndex: 2,
        keys: ['Line'],
        values: ['level=info msg="test msg" status_code=200 url=http://test'],
        links: [variableLink],
      };

      const fields = createLogLineLinks([fieldWithVarLink]);
      expect(fields.length).toBe(0);
    });
  });
});

const testTimeField = {
  name: 'timestamp',
  type: FieldType.time,
  config: {},
  values: [1],
};

const testLineField = {
  name: 'body',
  type: FieldType.string,
  config: {},
  values: ['line1'],
};

const testStringField = {
  name: 'test_field_string',
  type: FieldType.string,
  config: {},
  values: ['abc'],
};

const testFieldWithNullValue = {
  name: 'test_field_null',
  type: FieldType.string,
  config: {},
  values: [null],
};
