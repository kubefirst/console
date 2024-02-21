import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import moment from 'moment';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import CopyToClipboard from 'react-copy-to-clipboard';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Tooltip from '../../components/Tooltip/Tooltip';
import TabPanel, { Tab, a11yProps } from '../../components/Tab/Tab';
import ConciseLogs from '../ConciseLogs/ConciseLogs';
import { setCompletedSteps } from '../../redux/slices/api.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CLUSTER_CHECKS } from '../../constants/cluster';
import { ANSI_COLORS, ECHO_BLUE, LIBERTY_BLUE } from '../../constants/colors';

import {
  Container,
  Search,
  SearchTextField,
  TerminalHead,
  TerminalView,
  Tools,
} from './TerminalLogs.styled';

import { parseJSON } from '@/utils/isJson';

import 'xterm/css/xterm.css';

const UNSCAPE_STRING_REGEX = /\\x([0-9A-Fa-f]{2})/g;
const SEARCH_OPTIONS = { caseSensitive: false };

const { brightRed, darkBlue, gray, brightWhite } = ANSI_COLORS;

enum TERMINAL_TABS {
  CONCISE = 0,
  VERBOSE = 1,
}

const TerminalLogs: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [logs, setLogs] = useState<Array<string>>([]);

  const terminalRef = useRef(null);
  const searchAddonRef = useRef<SearchAddon>();
  const dispatch = useAppDispatch();
  const {
    api: { managementCluster, completedSteps },
  } = useAppSelector(({ config, api, installation }) => ({
    installation,
    config,
    api,
  }));

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchAddonRef.current?.findPrevious(value, SEARCH_OPTIONS);
    setSearchTerm(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const loadAddons = useCallback((terminal: XTerminal) => {
    if (terminal) {
      const searchAddon = new SearchAddon();
      const fitAddon = new FitAddon();

      terminal.loadAddon(fitAddon);
      terminal.loadAddon(searchAddon);

      searchAddonRef.current = searchAddon;
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current && managementCluster?.logFile) {
      const terminal = new XTerminal({
        convertEol: true,
        cols: 105,
        disableStdin: true,
        logLevel: 'off',
        scrollback: 5000,
        theme: {
          foreground: 'white',
          background: LIBERTY_BLUE,
        },
      });

      loadAddons(terminal);

      terminal.open(terminalRef.current);

      const eventSource = new EventSource(`/api/stream/${managementCluster?.logFile}`);
      eventSource.addEventListener('open', () => {
        // eslint-disable-next-line no-console
        console.log('connection established');
      });
      eventSource.addEventListener('message', (e) => {
        if (!e.data && !e.data.length) {
          return terminal.writeln('');
        }

        const { isValid, value: log } = parseJSON(e.data);

        if (!isValid) {
          return terminal.writeln(log);
        }

        if (log.message) {
          const { message, level, time } = log;

          const logLevel = level.toUpperCase();

          const logStyle = logLevel.includes('ERR') ? brightRed : darkBlue;

          const decodedMessage = message
            .replace(UNSCAPE_STRING_REGEX, (match: string, hex: string) =>
              String.fromCharCode(parseInt(hex, 16)),
            )
            .replaceAll('\x1B[1m', brightWhite);

          let localTime = time;
          if (moment(time).isValid()) {
            const uctDate = moment.utc(time).toDate();
            localTime = moment(uctDate).local().format('YYYY-MM-DD HH:mm:ss');
          }

          terminal.writeln(
            `${gray}${localTime} ${logStyle}${logLevel}:${brightWhite} ${decodedMessage}`,
          );

          setLogs((logs) => [...logs, `${localTime} ${level} ${decodedMessage} \n`]);
        }
      });

      eventSource.addEventListener('error', (e) => {
        // eslint-disable-next-line   no-console
        console.log('An error ocurred in the stream logs ', e);
        eventSource.close();
      });

      return () => {
        terminal.dispose();
        eventSource.close();
      };
    }
  }, [loadAddons, managementCluster?.logFile]);

  useEffect(() => {
    if (managementCluster && managementCluster?.checks) {
      Object.keys(CLUSTER_CHECKS).forEach((checkKey) => {
        const step = CLUSTER_CHECKS[checkKey];
        const isStepCompleted = managementCluster?.checks[checkKey];
        const isStepAdded = completedSteps.find(({ label }) => label === step.label);

        if (isStepCompleted && !isStepAdded?.label) {
          dispatch(setCompletedSteps([...completedSteps, step]));
        }
      });
    }
  }, [completedSteps, dispatch, managementCluster]);

  return (
    <Container>
      <TerminalHead>
        <Box>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              [`.${tabsClasses.scroller}`]: {
                height: 30,
              },
            }}
          >
            <Tab
              label="Concise"
              {...a11yProps(TERMINAL_TABS.CONCISE)}
              sx={{ minHeight: 'auto !important' }}
            />
            <Tab
              label="Verbose"
              {...a11yProps(TERMINAL_TABS.VERBOSE)}
              sx={{ minHeight: 'auto !important' }}
            />
          </Tabs>
        </Box>
        <Tools>
          <Search>
            <SearchIcon htmlColor={ECHO_BLUE} />
            <SearchTextField
              placeholder="Search"
              onChange={handleSearch}
              size="small"
              fullWidth
              value={searchTerm}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  searchAddonRef.current?.findNext(searchTerm, SEARCH_OPTIONS);
                }
              }}
            />
          </Search>
          <Tooltip title="Help documentation" placement="top">
            <HelpOutlineIcon htmlColor={ECHO_BLUE} />
          </Tooltip>
          <CopyToClipboard text={logs.join('\n')}>
            <Tooltip title="Copy" placement="top">
              <ContentCopyIcon htmlColor={ECHO_BLUE} />
            </Tooltip>
          </CopyToClipboard>
          {/* <OpenInFullIcon htmlColor={ECHO_BLUE} /> */}
        </Tools>
      </TerminalHead>

      <TabPanel value={activeTab} index={TERMINAL_TABS.CONCISE}>
        <ConciseLogs completedSteps={completedSteps} />
      </TabPanel>
      <TabPanel value={activeTab} index={TERMINAL_TABS.VERBOSE}>
        <TerminalView ref={terminalRef} />
      </TabPanel>
    </Container>
  );
};

export default TerminalLogs;
