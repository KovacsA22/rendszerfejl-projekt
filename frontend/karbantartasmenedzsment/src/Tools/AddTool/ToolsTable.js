import React from 'react';
import axios from 'axios';


export default class ToolsTable extends React.Component {
    state = {
        devices: []
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/devices/`)
            .then(res => {
                const devices = res.data;
                this.setState({ devices });
            })
    }

    render() {
        return (
            <div>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Név</th>
                            <th>Kategória</th>
                            <th>Leírás</th>
                            <th>Hely</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.devices
                            .map(device =>
                                <tr key={device.id}>
                                    <td>{device.id}</td>
                                    <td>{device.name}</td>
                                    <td>{device.task_category_id}</td>
                                    <td>{device.description}</td>
                                    <td>{device.location}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}