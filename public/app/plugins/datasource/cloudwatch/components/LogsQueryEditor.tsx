// Libraries
import { css } from '@emotion/css';
import React, { memo, ChangeEvent, useState } from 'react';

import { AbsoluteTimeRange, QueryEditorProps, CoreApp, GrafanaTheme2 } from '@grafana/data';
import { Stack } from '@grafana/experimental';
import { InlineFormLabel, Collapse, Input, useStyles2 } from '@grafana/ui';

import { CloudWatchDatasource } from '../datasource';
import { CloudWatchJsonData, CloudWatchLogsQuery, CloudWatchQuery } from '../types';

import { CloudWatchLink } from './CloudWatchLink';
import CloudWatchLogsQueryField from './LogsQueryField';

type Props = QueryEditorProps<CloudWatchDatasource, CloudWatchQuery, CloudWatchJsonData> & {
  query: CloudWatchLogsQuery;
};

const labelClass = css`
  margin-left: 3px;
  flex-grow: 0;
`;

const collapseTitleStyle = (theme: GrafanaTheme2) => {
  return {
    title: css({
      flexGrow: 1,
      overflow: 'hidden',
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      margin: 0,
    }),
    labelSummary: css({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.bodySmall.fontWeight,
      paddingLeft: theme.spacing(2),
      gap: theme.spacing(2),
      display: 'flex',
    }),
  };
};

export const CloudWatchLogsQueryEditor = memo(function CloudWatchLogsQueryEditor(props: Props) {
  const { query, data, datasource, exploreId } = props;

  const [maxAttemptsError, setMaxAttemptsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const styles = useStyles2(collapseTitleStyle);

  let absolute: AbsoluteTimeRange;
  if (data?.request?.range?.from) {
    const { range } = data.request;
    absolute = {
      from: range.from.valueOf(),
      to: range.to.valueOf(),
    };
  } else {
    absolute = {
      from: Date.now() - 10000,
      to: Date.now(),
    };
  }

  const changeMaxAttempts = (event: ChangeEvent<HTMLInputElement>) => {
    const attempts = parseFloat(event.target.value);
    if (Number.isInteger(attempts)) {
      props.onChange({ ...query, alertMaxAttempts: attempts });
      setMaxAttemptsError(false);
    } else {
      setMaxAttemptsError(true);
    }
  };

  return (
    <>
      <CloudWatchLogsQueryField
        {...props}
        exploreId={exploreId}
        history={[]}
        absoluteRange={absolute}
        ExtraFieldElement={
          <InlineFormLabel className={`gf-form-label--btn ${labelClass}`} width="auto" tooltip="Link to Graph in AWS">
            <CloudWatchLink query={query as CloudWatchLogsQuery} panelData={data} datasource={datasource} />
          </InlineFormLabel>
        }
      />
      {props.app === CoreApp.UnifiedAlerting ? (
        <Collapse
          label={
            <Stack gap={0} wrap={false}>
              <h6 className={styles.title}>Alert Query Options</h6>
              {!isOpen && query.alertMaxAttempts && (
                <div className={styles.labelSummary}>
                  <span>{`Max attempts: ${query.alertMaxAttempts}`}</span>
                </div>
              )}
            </Stack>
          }
          isOpen={isOpen}
          onToggle={(collapsed: boolean) => setIsOpen(collapsed)}
        >
          <div className="gf-form">
            <InlineFormLabel
              width={14}
              tooltip={
                <>
                  Number of attempts to get the query results from the datasource before the alert times out. Attempts
                  are made 1 second apart. Default value: 8
                </>
              }
            >
              Maximum number of attempts
            </InlineFormLabel>
            <Input
              type="number"
              className="width-6"
              placeholder="8"
              spellCheck={false}
              defaultValue={8}
              onChange={changeMaxAttempts}
              invalid={maxAttemptsError}
            />
            <div className="gf-form-label">seconds</div>
          </div>
        </Collapse>
      ) : null}
    </>
  );
});

export default CloudWatchLogsQueryEditor;
