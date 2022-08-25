import React, { FC } from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import Input from '../components/Input';

const Sandbox: FC<{}> = () => {
  return (
    <div>
      <div>
        <Text element="h1" textStyle="heading">
          Buttons
        </Text>
        <Button onClick={() => alert('click')}>Click me!</Button> <br />
        <Button disabled={true} onClick={() => alert('click')}>
          Disabled
        </Button>
      </div>
      <div>
        <Text element="h1" textStyle="heading">
          Text:
        </Text>
        <Text element="h2" textStyle="heading2">
          Headings
        </Text>
        <Text element="h1" textStyle="heading">
          Big Heading
        </Text>
        <Text element="h2" textStyle="heading2">
          Smaller Heading
        </Text>
        <Text element="h1" textStyle="heading">
          Body Text:
        </Text>
        <Text element="p" textStyle="body">
          This is some body text.
        </Text>
        <Text element="h1" textStyle="heading">
          Feedback:
        </Text>
        <Text element="p" textStyle="feedback" color="success">
          You got it right!
        </Text>
        <Text element="p" textStyle="feedback" color="failure">
          You got it wrong ☹️
        </Text>
        <Text element="h1" textStyle="heading">
          Input:
        </Text>
        <Input value="foo" onClick={(str) => alert(str)}>
          Choose me!
        </Input>
      </div>
    </div>
  );
};

export default Sandbox;
