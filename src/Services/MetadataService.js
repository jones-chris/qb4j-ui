import {Component} from "react";

class MetadataService extends Component{
    constructor() {
        super();

        this.databaseUrl = 'http://localhost:8080/metadata/database';
        this.schemaUrl = 'http://localhost:8080/metadata/{}/schema';
        this.tableUrl = 'http://localhost:8080/metadata/{}/{}/table-and-view';
        this.columnUrl = 'http://localhost:8080/metadata/{}/{}/{}/column'
    }

    async getDatabases() {
        await fetch(this.databaseUrl)
            .then((response) => {
                console.log(response);

                if (response.ok) {
                    let clonedResponse = response.clone();
                    return clonedResponse.json();
                }
            });
    }

    getSchemas(databaseName) {
        let schemaUrl = `${this.schemaUrl}/${databaseName}/schema`;

        fetch(schemaUrl)
            .then((response) => {
                return response.json();
            })
    }
}

export default MetadataService;
