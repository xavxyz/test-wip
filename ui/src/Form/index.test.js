import React from 'react';
import { Form } from './index';
import { shallow } from 'enzyme';

it('should handle the input value and pass it directly to a "state handler"', () => {
  const mockedStateHandler = jest.fn();
  const inputValue = 20;
  const event = {
    target: {
      value: inputValue,
    },
  };
  const state = { money: inputValue };

  const component = shallow(
    <Form state={state} setState={mockedStateHandler} />
  );

  component.find('input').simulate('change', event);

  expect(mockedStateHandler).toHaveBeenCalledWith(state);
});

it('should submit the form without reloading the page and passing the form state to the mutation', () => {
  const event = {
    preventDefault: jest.fn(),
  };
  const mutate = jest.fn();

  const state = { money: 20 };

  const component = shallow(
    <Form state={state} setState={jest.fn()} mutate={mutate} />
  );

  component.find('form').simulate('submit', event);

  expect(event.preventDefault).toHaveBeenCalled();
  expect(mutate).toHaveBeenCalledWith({
    variables: { money: state.money },
  });
});
