import React, {Component} from "react";
import ReactDOM from 'react-dom';
import SuperTreeView from 'react-super-treeview';
import MetadataService from '../Services/MetadataService'

class Metadata extends Component {

    constructor() {
        super();
        // console.log(process.env.REACT_APP_development_metadata_databases_api_url);

        console.log('In constructor');
        // let databases = new MetadataService().getDatabases();
    //     this.state = {
    //         data: [
    //             {
    //                 id: 1,
    //                 name: 'Parent A'
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Parent B',
    //                 isExpanded: true,
    //                 isChecked: true,
    //                 children: [
    //                     {
    //                         id: 1,
    //                         name: 'Child 1'
    //                     },
    //                     {
    //                         id: 2,
    //                         name: 'Child 2'
    //                     }
    //                 ]
    //             }
    //         ]
    //     };
    // }

        this.state = {
            // Each object in the metadata array is a database with schemas.
            // Each schema has an array of tables.
            // Each table has an array of columns.
            metadata: [
                {
                    id: 1,
                    name: 'qb4j',
                    isExpanded: true,
                    isChecked: true,
                    children: [ // Schemas
                        {
                            id: 1,
                            name: 'public',
                            isExpanded: true,
                            isChecked: true,
                            children: [ // Tables
                                {
                                    id: 1,
                                    name: 'county_spending_detail',
                                    isExpanded: false,
                                    isChecked: false,
                                    children: [ // Columns
                                        {
                                            id: 1,
                                            name: 'fiscal_year (int)',
                                            type: 'int'
                                        },
                                        {
                                            id: 2,
                                            name: 'amount (int)',
                                            type: 'int'
                                        },
                                        {
                                            id: 3,
                                            name: 'service (varchar)',
                                            type: 'varchar'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        console.log('In componentDidMount');

        fetch('http://localhost:8080/metadata/database', {
            'no-cors': true
        })
            .then((response) => {
                console.log(response);

                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
            })
    }

    render() {
        return (
            <SuperTreeView
                data={ this.state.metadata }
                onUpdateCb={(updatedData) => {
                    this.setState({metadata: updatedData})
                }}
                isExpandable={(node, depth) => {
                    // Make columns not expandable, because they are the lowest node in the tree.
                    // All other nodes can be expanded.
                    if (depth >= 3) {
                        return false;
                    } else {
                        return true;
                    }
                }}
                isDeletable={(node, depth) => {
                    return false;
                }}
                onCheckToggleCb={(nodes) => {
                    const checkState = nodes[0].isChecked;

                    applyCheckStateTo(nodes);

                    function applyCheckStateTo(nodes){
                        nodes.forEach((node)=>{
                            node.isChecked = checkState;
                            if(node.children){
                                applyCheckStateTo(node.children);
                            }
                        })
                    }
                }}
                onExpandToggleCb={(node, depth)=>{
                    if(node.isExpanded === true){
                        // This will show the loading sign
                        node.isChildrenLoading = true;

                        // setTimeout(()=>{
                        //     const updatedData = cloneDeep(state.data);
                        //
                        //     // Remove loading sign
                        //     updatedData[0].isChildrenLoading = false;
                        //
                        //     // Make sure node is expanded
                        //     updatedData[0].isExpanded = true;
                        //
                        //     // Set Children data that you potentially
                        //     // got from an API response
                        //     updatedData[0].children = [
                        //         {
                        //             id: 22,
                        //             name: 'Child 1'
                        //         },
                        //         {
                        //             id: 23,
                        //             name: 'Child 2'
                        //         }
                        //     ];
                        //
                        //     // Update state
                        //     this.setState({data: updatedData})
                        //
                        // }, 1700);
                    }
                }}
            />
        );
    }

}

export default Metadata;
