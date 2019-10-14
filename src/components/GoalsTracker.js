import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../css/GoalsTracker.css";
import API from "./API";
import NavBar from "./NavBar";
import NewGoalForm from "./NewGoalForm";

class GoalsTracker extends React.Component {
  goals = [];

  state = {
    showNewGoalForm: false,
    showActionItems: false
  };

  handleCompletedActionItem = itemId => {
    API.updateItemActionIsCompleted({id: itemId})
    .then(data => {
      if (data.error) {
        throw Error(data.error);
      } else {
        this.getUserData()
      }
    })
    .catch(error => {
      alert(error);
    })
  }

  showActionItems = () => {
    this.setState({
      showActionItems: !this.state.showActionItems
    });
  };

  hideNewGoalForm = () => {
    this.setState({
      showNewGoalForm: false
    });
  };

  handleDeleteClick = e => {
    const goalId = e._dispatchInstances.key
    API.deleteGoal({goalId})
    .then(data => {
      if (data.error) {
        throw Error(data.error);
      } else {
        this.props.history.push('/goals-tracker')
      }
    })
    .catch(error => {
      alert(error);
    })
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    API.getUserData()
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.props.giveMeUserData(data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    if (!this.props.userData) return <div>Loading user info</div>;

    return (
      <div>
        <NavBar />
        <div className="grid-container2">
          <div className="grid-item11">
            <h1>🔥 Your Current Goals 🔥</h1>
          </div>
          <img
            className="grid-item22"
            style={{ borderRadius: "20%" }}
            src="https://images.unsplash.com/photo-1543682704-15adeb008ac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            alt="Smiley face"
            height="700"
            width="500"
          />
          <div className="grid-item33">
            <h2>Goals:</h2>
            <button onClick={() => this.showActionItems()} className="ui mini button">Show Action Items</button>
            <div>
            <ul style={{ textAlign: "left", display: "inline-block" }}>
              {this.props.userData.goals.map(mygoal => {
                return (
                  <div>
                    <li>
                      <h3>{mygoal.goal[1]} </h3>  
                      <h4 style={{ display: 'inline'}}>Completion Status: {mygoal.goal[2].completion_status}</h4>
                      {this.state.showActionItems ? <ul>
                        {mygoal.action.map(myAction => { return (
                        myAction.isComplete ? <li><h4 style={{ textDecoration: 'line-through'}}>{myAction.action} <i class="em em-white_check_mark" aria-role="presentation" aria-label="WHITE HEAVY CHECK MARK"></i></h4></li> : (<li><h4>{myAction.action} <button onClick={() => this.handleCompletedActionItem(myAction.id)}>Action Completed</button></h4></li>) )
                      })} </ul> : null}
                    </li>
                    <br></br>
                    <button 
                      key={mygoal.goal[0]}
                      className="ui mini red button"
                      onClick={e => this.handleDeleteClick(e)}
                      >Delete Goal</button>
                      <br></br>
                      <br></br>
                      <br></br>
                  </div>
                );
              })}
            </ul> </div>
            <br></br>
            <br></br>
            {!this.state.showNewGoalForm ? (
              <button
                onClick={() => this.setState({ showNewGoalForm: true })}
                className="ui green button"
              >
                Add New Goal
              </button>
            ) : null}
            {this.state.showNewGoalForm ? (
              <NewGoalForm hideNewGoalForm={this.hideNewGoalForm} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user,
  userData: state.userData
});

const mapDispatchToProps = dispatch => ({
  signIn: user => {
    dispatch({ type: "SIGN_IN", payload: user });
  },
  signOut: () => {
    dispatch({ type: "SIGN_OUT" });
  },
  releaseUserData: () => {
    dispatch({ type: "RELEASE_USER_DATA" });
  },
  giveMeUserData: user => {
    dispatch({ type: "GIVE_ME_USER_DATA", payload: user });
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GoalsTracker)
);
