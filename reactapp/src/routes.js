import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import all components
import List from './pages/list'
import EditDriver from './pages/edit-driver'
import CreateDriver from './pages/create-driver'
import MapPage from './pages/map-page'
import MainMenu from './pages/main-menu'

// router, changes the component displayed based on the page address
const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={MainMenu} />
			<Route path={["/map/:id", "/map"]} component={MapPage} />
			<Route exact path="/drivers" component={List} />
			<Route path="/drivers/new" component={CreateDriver} />
			<Route path="/drivers/:id" component={EditDriver} />
		</Switch>
	</BrowserRouter>
)

export default Routes;