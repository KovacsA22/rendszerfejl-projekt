import React from 'react';
import axios from 'axios';


export default class CategoryTable extends React.Component {
    state = {
        devices: [],
        qualifications:[]
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/taskcategories/`)
            .then(res => {
                const devices = res.data;
                this.setState({ devices });
            })
        axios.get(`http://127.0.0.1:8000/qualifications/`)
            .then(res => {
                const qualifications = res.data;
                this.setState({ qualifications });
            })
    }

    render() {
        return (
            <div>
                <table className="ui celled table"style={{ marginTop: '2em' }}>
                    <thead>
                        <tr>
                        <th>ID</th>
                            <th>Név</th>
                            <th>Idő (óra)</th>
                            <th>Karbantartási periódus (hónap)</th>
                            <th>Leírás</th>
                            <th>Végzettségek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.devices
                            .map(device =>
                                <tr key={device.id}>
                                    <td>{device.id}</td>
                                    <td>{device.name}</td>
                                    <td>{device.time_in_hours}</td>
                                    <td>{device.maintenance_period_in_months}</td>
                                    <td>{device.instructions}</td>
                                    <td>{this.state.qualifications.map(q=>q.id===device.qualifications?q.name:null)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}