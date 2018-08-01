const debuglevels = require('@elunic/debug-levels');

debuglevels.enable('*');
debuglevels.setLevel('trace');

const loggerA = debuglevels('worker:a');
const loggerB = debuglevels('worker:b');

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
