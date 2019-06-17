import React, { Component } from 'react'
import api from '../../services/api'
import './styles.css'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'

export default class List extends Component {
	state = {
		drivers: [],
		driversInfo: {},
		page: 1
	}

	componentDidMount() {
		this.loadDrivers();
	}

	loadDrivers = async (page = 1) => {
		const response = await api.get(`/drivers?page=${page}`)

		const { docs, ...driversInfo} = response.data

		this.setState({ drivers: docs, driversInfo, page})
	}

	previousPage = () => {
		const { page } = this.state

		if (page === 1) return

		const pageNumber = page - 1

		this.loadDrivers(pageNumber)
	}

	nextPage = () => {
		const { page, driversInfo } = this.state

		if (page === driversInfo.pages) return

		const pageNumber = page + 1

		this.loadDrivers(pageNumber)
	}

	deleteDriver = async (e, id) => {
		await api.delete(`/drivers/${id}`)

		this.loadDrivers(this.state.page)
	}

	render() {
		const { drivers, driversInfo, page } = this.state

		return (
			<div className="driver-list">
				{drivers.map(driver => {
					return (
						<article key={driver._id}>
							<div>
								<strong>{driver.name}</strong>
								<div className="driver-actions">
									<Link to={`/drivers/${driver._id}`} id="action_edit"></Link>
									<Popup trigger={<button id="action_delete"></button>}
										position="top right"
									>
										<div className="delete-popup">
											<div>
												<p>Are you sure you want to delete {driver.name}?</p>
											</div>
											<div>
												<button onClick={(e) => { this.deleteDriver(e, driver._id) }}>Delete</button>
											</div>
										</div>
									</Popup>
								</div>
							</div>
							<p>{driver.carPlate}</p>

							<a id="a_map" href="">View on map</a>
						</article>
					)
				})}

				<div className="actions">
					<button disabled={ page === 1 } onClick={this.previousPage}>Previous</button>
					<button disabled={ page === driversInfo.pages} onClick={this.nextPage}>Next</button>
				</div>
			</div>
		)
	}
}