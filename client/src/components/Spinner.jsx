import spinner from '../assets/spinner.gif';

export default function Spinner() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <img width={180}
                className="mx-auto"
                src={spinner}
                alt="Loading..." />
        </div>
    )
}