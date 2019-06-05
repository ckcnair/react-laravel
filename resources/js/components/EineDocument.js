// resources/assets/js/components/SingleProject.js

import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class EineDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document: {},
            documents: []
        };
    }

    componentDidMount() {
        const docId = this.props.match.params.id;
        axios.get(`/api/documents/${docId}`).then(response => {
            this.setState({
                document: response.data,
                tasks: response.data.tasks
            });
        });

        axios.get("/api/documents").then(response => {
            this.setState({
                documents: response.data
            });
        });
    }

    render() {
        const { document, documents } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                {documents.map((doc, index) => (
                                    <li className="nav-item" key={index}>
                                        <Link
                                            className="nav-link sidebar-heading active"
                                            to={`/${doc.id}`}
                                            key={doc.id}
                                        >
                                            <strong>
                                                {doc.title} #{doc.id}
                                            </strong>
                                        </Link>
                                        <h6 className=" d-flex justify-content-between align-items-center px-3 mt-1 mb-1 text-muted">
                                            <span>Me, Dustin</span>
                                            <a
                                                className="d-flex align-items-center text-muted"
                                                href="#"
                                            />
                                        </h6>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                    <main
                        role="main"
                        className="col-md-9 ml-sm-auto col-lg-10 px-4"
                    >
                        <div className="">
                            <div className="card">
                                <img
                                    className="card-img"
                                    src={`/storage/uploads/${
                                        document.filename
                                    }`}
                                    alt="Card image"
                                />
                                <div className="card-header">
                                    {document.doc_title}
                                </div>
                                <div className="card-body">
                                    <p>{document.doc_title}</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default EineDocument;
