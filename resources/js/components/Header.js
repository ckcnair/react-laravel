import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            selectedFile: null
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onUpload = this.onUpload.bind(this);
        //this.createImage = this.createImage.bind(this);
    }

    onChangeHandler(e) {
        //Not working!!!
        this.setState({ selectedFile: e.target.files[0] });
        //let files = e.target.files || e.dataTransfer.files;
        //if (!files.length) return;
        this.onUpload(e.target.files[0]);
    }

    async onUpload(file) {
        if (file.length > 0) {
            const data = new FormData();
            //Not working!!!
            //data.append("file", this.state.selectedFile);
            data.append("file", file);
            let token = "12345";
            await axios
                .post("/api/upload", data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(res => {
                    if (res.data === "1") {
                        this.setState({ sucess: true });
                        return;
                    }

                    this.setState({ error: true });
                })
                .catch(e => {
                    console.log(e);
                });
        }

        return;
    }
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-laravel navbar-dark bg-primary">
                <div className="container">
                    <div className="col-sm-3 col-md-2 m-r-0">
                        <Link className="navbar-brand" to="/">
                            FILES
                        </Link>
                        <FontAwesomeIcon icon="fa upload" />
                        <label className="btn btn-default text-right">
                            Upload{" "}
                            <input
                                type="file"
                                name="file"
                                hidden
                                onChange={this.onChangeHandler}
                            />
                        </label>
                    </div>
                    <div className="col-sm-9 col-md-10" style={{}}>
                        <strong>DOCUMENT</strong>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
