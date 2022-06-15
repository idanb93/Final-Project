import react from 'react'

class ErrorBoundary extends react.Component {

    constructor(){
        super();
        this.state = {
            hasError: false,
            errorInfo: '',
        }
    }

    componentDidCatch(errorInfo){
        this.setState({ hasError: true, errorInfo: errorInfo });
    }

    render(){

        console.log(this.state.errorInfo);

        if (this.state.hasError) {
            return (
                <div>
                    <h2>An error has occured....</h2>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;