
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import {
	HashRouter,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import ComponentPageTest1 from "@/component/ComponentPageTest1";
import ComponentPageTest2 from "@/component/ComponentPageTest2";

const Component: React.FunctionComponent<{}> = (): JSX.Element => {
	return <div>
		<HashRouter>
			<Switch>
				<Route path="/test1"><ComponentPageTest1 /></Route>
				<Route path="/test2"><ComponentPageTest2 /></Route>
				<Route path="*">
					<div><Link to="/test1">test1</Link></div>
					<div><Link to="/test2">test2</Link></div>
				</Route>
			</Switch>
		</HashRouter>
	</div>;
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

