import React from 'react';
import axios from 'axios';


export default class QualificationsTable extends React.Component {
    state = {
        devices: []
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/qualifications/`)
            .then(res => {
                const devices = res.data;
                this.setState({ devices });
            })
    }

    render() {
        return (
            <div>
                <table className="ui celled table"style={{ marginTop: '2em' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Megnevezés</th>
                         </tr>
                    </thead>
                    <tbody>
                        {this.state.devices
                            .map(device =>
                                <tr key={device.id}>
                                    <td>{device.id}</td>
                                    <td>{device.name}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}