import * as driver from 'bigchaindb-driver' // eslint-disable-line import/no-namespace
import React from 'react'
import { Link } from 'react-router-dom'

import Code from './Code'
import Output from './Output'

import bdborm from '../initdb'

class Create extends React.Component {
    constructor(props) {
        super(props)
        const keypair = JSON.parse(localStorage.getItem('keypair'))
        this.state = {
            output: null,
            crab: null,
            keypair: keypair || new driver.Ed25519Keypair()
        }
        localStorage.setItem('keypair', JSON.stringify(this.state.keypair))
        this.createCrab = this.createCrab.bind(this)
    }
    createCrab() {
        bdborm.crab
            .create({
                keypair: this.state.keypair,
                metadata: { meta: 'toMeta4You' }
            })
            .then((crab) => {
                this.setState({
                    output: JSON.stringify(crab.id, null, 2),
                    crab
                })
                localStorage.setItem('crabid', crab.id)
            })
            .catch(error => console.error(error))
    }
    render() {
        return (
            <div className="row row--wide">
                <div>
                    <h1>Create</h1>
                    <div>Create the crab asset</div>
                    <br/>
                </div>
                <div className="exampleHolder">
                    <div className="sideHolder">
                        <Code step="create"/>
                        <button className="button button--primary button-block"
                            onClick={this.createCrab}>
                            Execute code
                        </button>
                    </div>
                    <div className="sideHolder">
                        <Output output={this.state.output}/>
                        { this.state.output ?
                            <Link
                                className="button button--primary button-block"
                                to={{
                                    pathname: '/retrieve',
                                    state: {
                                        crab: this.state.crab,
                                        keypair: this.state.keypair
                                    }
                                }}>
                                Next step: retrieve
                            </Link>
                            : null }
                    </div>
                </div>
            </div>
        )
    }
}

export default Create
