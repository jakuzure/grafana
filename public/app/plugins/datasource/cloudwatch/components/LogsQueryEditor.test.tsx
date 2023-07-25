import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CoreApp } from '@grafana/data';


import { setupMockedDataSource } from '../__mocks__/CloudWatchDataSource';
import { CloudWatchLogsQuery } from '../types';

import { CloudWatchLogsQueryEditor } from './LogsQueryEditor';

describe('LogsQueryEditor', () => {
  describe('Alert query options', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    const datasource = setupMockedDataSource().datasource;
    const query: CloudWatchLogsQuery = {
      refId: 'A',
      expression: '',
      id: 'test',
      queryMode: 'Logs',
      region: 'us-east-2',
    };
    const props = {
      app: CoreApp.UnifiedAlerting,
      datasource,
      onChange: jest.fn(),
      onRunQuery: jest.fn(),
    };
    it('should  update query.alertMaxOptions if the user enters a valid int', async () => {
      render(<CloudWatchLogsQueryEditor query={query} {...props} />);
      const collapse = await screen.findByText('Alert Query Options');
      await userEvent.click(collapse);
      const maxOptionsInput = await screen.findByTestId('input');
      await userEvent.type(maxOptionsInput, '10');
      expect(props.onChange).toHaveBeenCalledWith(expect.objectContaining({ alertMaxAttempts: 10 }));
    });
    it('should not update query.alertMaxOptions if the user enters an invalid int', async () => {
      render(<CloudWatchLogsQueryEditor query={query} {...props} />);
      const collapse = await screen.findByText('Alert Query Options');
      await userEvent.click(collapse);
      const maxOptionsInput = await screen.findByTestId('input');
      await userEvent.type(maxOptionsInput, 'T');
      expect(props.onChange).not.toHaveBeenCalled();
    });
  });
});
