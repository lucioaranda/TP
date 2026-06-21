import React from 'react';

import renderer from 'react-test-renderer';

import TestButton from '../components/TestButton';

describe('TestButton', () => {
  test('renderiza correctamente', () => {
    const tree = renderer.create(
      <TestButton
        title="Prueba"
        onPress={() => {}}
      />
    );

    expect(tree).toBeTruthy();
  });
});