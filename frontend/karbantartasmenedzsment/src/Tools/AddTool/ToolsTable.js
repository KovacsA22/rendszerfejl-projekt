import React from 'react';
import axios from 'axios';


export default class ToolsTable extends React.Component {
    state = {
        devices: [],
        task_categories: []
    }


    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/devices/`)
            .then(res => {
                const devices = res.data;
                this.setState({ devices });
            })
        axios.get(`http://127.0.0.1:8000/taskcategories/`)
            .then(res => {
                const task_categories = res.data;
                this.setState({ task_categories });
            })
    }


    render() {
        const names = ['Bruce', 'Clark', 'Diana']
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
                                    <td>{this.state.task_categories.map(category =>
                                        category.id !== device.task_category_id ? null : category.name)}</td>
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