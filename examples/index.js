const debuglevels = require('../src/index');

debuglevels.enable('*');
debuglevels.setLevel('trace');

const workerLogger = debuglevels('worker');

const loggerA = workerLogger.createLogger('a');
const loggerB = workerLogger.createLogger('b');

loggerA.info('info');
loggerB.info('info');


loggerA.fatal('fatal');
loggerB.fatal('fatal');
loggerA.error('error');
loggerB.error('error');
loggerA.warn('warn');
loggerB.warn('warn');
loggerA.info('info');
loggerB.info('info');
loggerA.debug('debug');
loggerB.debug('debug');
loggerA.trace('trace');
loggerB.trace('trace');
