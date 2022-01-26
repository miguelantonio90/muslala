import React, {Component} from 'react';

export default class Index extends Component {


    render() {
        return (
            <div>

                <h3 align="center">Project Test</h3>
                <h2>Conditions</h2>
                <p>You have to prepare a solution to the proposed problem in the defined period of time. The solution
                    must comply with the requirements. For anything not explicitly listed, you are free to choose
                    whatever technology/library/tool you feel comfortable with.
                    Once ready, you must send a package with the source code of the solution, so it can be built and
                    reviewed by Musala Soft. Instructions how to use the solution must also be provided (resource names,
                    SQL scripts to import test data, other scripts, etc.).
                    If you have completed the task after the deadline has expired, you are still encouraged to submit a
                    solution.
                </p>
                <h2>Software Requirements</h2>
                <p>Programming language: JavaScript</p>
                <p>Framework: Node.js/JavaScript + Angular/React or other</p>
                <p>Database: MongoDB or in-memory</p>
                <p>Automated build: Solution of choice</p>

            </div>
        )

    }
}