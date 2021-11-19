
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { Button, Pane, Text, majorScale } from 'evergreen-ui'

const Component: React.FunctionComponent<{}> = (): JSX.Element => {
	return <div>
		<Pane display="flex" alignItems="center" marginX={majorScale(2)}>
			<Button>Click me!</Button>
			<Text>This is a clickable Button</Text>
		</Pane>
	</div>;
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

