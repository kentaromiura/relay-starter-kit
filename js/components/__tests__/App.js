const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactTestRenderer = require('react-test-renderer');
// This beforeEach will not be needed anymore with Relay 0.9.4
beforeEach(() => {
  const RelayMasterPath = path.resolve(__dirname, '../../../node_modules/relay-master/');

  if(! fs.existsSync(path.join(RelayMasterPath, 'lib/RelayShallowMock.js'))) {
    console.log('installing Relay(Master) dependencies and building...');
    const spawn = require('child_process').spawnSync;
    spawn('yarn', ['install'], {
      stdio: 'inherit',
      cwd: RelayMasterPath
    });
  }
})

test('App.js', () => {
  jest.mock('react-relay', () => require('relay-master/lib/RelayShallowMock'));
  const App = require('../App').default.unwrap();
  const viewerMock = {
    widgets: {
      edges: [
        {node: {name: 'Cristian rocks!', id: 'ID12345'}}
      ]
    }
  };
  expect(ReactTestRenderer.create(<App viewer={viewerMock} />)).toMatchSnapshot();
  expect(true).toBe(true);
});
