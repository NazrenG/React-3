import { Component } from "react";
import styled from "./UI/Timer.module.css";

class Timer extends Component {
  state = {
    seconds: 0,
    isCheck: false,
  };
  timer = null;
  componentDidMount = () => {
    console.log("Component Did Mount");
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.seconds != this.state.seconds) {
      console.log("Component Did Update");
    }
  };
  componentWillUnmount = () => {
    console.log("Component Will Unmount");
    clearInterval(this.timer);
    this.setState({ isCheck: false });
  };
  handleInputChange = (event) => {
    this.setState({
      seconds: Number(event.target.value),
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.seconds > 0 && !this.state.isCheck) {
      this.setState({ isCheck: true });
      this.timer = setInterval(() => {
        this.setState((prevState) => {
          if (prevState.seconds > 0) {
            return { seconds: prevState.seconds - 1 };
          } else {
            clearInterval(this.timer);
            return { isCheck: false };
          }
        });
      }, 1000);
    }
  };
  render() {
    const { seconds, isCheck } = this.state;
    return (
      <div>
        <h1>Timer</h1>
        <input
          className={styled.timerInput}
          type="number"
          placeholder="Enter second.."
          value={seconds}
          onChange={this.handleInputChange}
        />
        <button
          onClick={this.handleSubmit}
          className={styled.timerButton}
          type="submit"
        >
          Start
        </button>

        <p>{isCheck ? seconds : "Time`s up!"}</p>
      </div>
    );
  }
}
export default Timer;
