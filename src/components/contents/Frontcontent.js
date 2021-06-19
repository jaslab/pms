import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Tabsdata } from '../../data/data'
import Letterform from '../../components/forms/Letterform'
import Chequeform from '../../components/forms/Chequeform'
import Emailform from '../../components/forms/Emailform'
import Faxform from '../../components/forms/Faxform'

export default function Frontcontent() {
    return (

        <div className="container-fluid m-4">
            <div className="row"></div>
            <div className="row">
                <div className="col">

                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <Tabs defaultActiveKey="letter" id="uncontrolled-tab-example">
                                <Tab eventKey="letter" title={Tabsdata.letter}>
                                    <Letterform />
                                </Tab>
                                <Tab eventKey="cheque" title={Tabsdata.cheque}>
                                    <Chequeform />
                                </Tab>
                                <Tab eventKey="email" title={Tabsdata.email}>
                                    <Emailform />
                                </Tab>
                                <Tab eventKey="fax" title={Tabsdata.fax}>
                                    <Faxform />
                                </Tab>
                                
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>



        </div>

    )
}
