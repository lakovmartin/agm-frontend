import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";




class Chart extends Component {
  
    
      chartData = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    min: 0,
                    max: 10    
                }
              }]
           },
        labels: [
          "Finances",
          "Dating/Relationships",
          "Social",
          "Spiritual",
          "Health & Fitness",
        ],
        datasets: [
          {
            label: "Score",
            data: [this.props.userData.life_status_tracker.finances, 
                this.props.userData.life_status_tracker.dating, 
                this.props.userData.life_status_tracker.social, 
                this.props.userData.life_status_tracker.spiritual, 
                this.props.userData.life_status_tracker.health],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ]
          }
        ]
      }

  

  render() {

    return (


      <div className="chart">
        <Bar
          data={this.chartData}
          options={{
            layout: {
              padding: 0
                },
            title: {
              display: true,
              fontSize: 30,
              text: 'My Life Status Tracker', 
              padding: 10,
              fontColor: 'white'
            },
            fontColor: 'black',
            legend: {
                display: false,
                },
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 13,
                        beginAtZero:true,
                        min: 0,
                        max: 10,
                        fontColor: 'black'    
                    }
                  }],
                  xAxes: [{
                    ticks: {
                        fontSize: 13,  
                        fontColor: 'black' 
                    }
                  }]
               }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    userData: state.userData
  });
  
  export default withRouter(
    connect(
      mapStateToProps,
      null
    )(Chart)
  );
