import React, { Component } from 'react';
import './Graph.css';
import { XYPlot, LineSeries, Crosshair, MarkSeries } from 'react-vis';
import * as moment from 'moment';
import '../../../node_modules/react-vis/dist/style.css';
import xAxis from 'react-vis/dist/plot/axis/x-axis';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredNode: null,
      show: false
    };
  }

  render() {
    const { hoveredNode, show } = this.state;
    const end = this.props.showDay ? this.props.currentTicks.length * 13 : 800;
    return (
      <div className="uk-container-small">
        <XYPlot
          height={300}
          width={900}
          stroke={this.props.marketIsUp ? '#21ce99' : '#f45531'}
          yRange={[10, 180]}
          xRange={[10, end]}
          onMouseLeave={() => {
            this.setState({
              show: false
            });
            this.props.onUpdatePrice(0, this.state.show);
          }}
        >
          <LineSeries
            data={this.props.currentTicks}
            onNearestX={(datapoint, event) => {
              this.setState({
                hoveredNode: {
                  x: datapoint.x,
                  y: datapoint.y,
                  time: moment(datapoint.dateTime).format('hh:mm A') + ' ET',
                  dateTime:
                    moment(datapoint.dateTime).format('hh:mm A, MMM DD') +
                    ' ET',
                  date: moment(datapoint.dateTime).format('MMM DD, YYYY')
                },
                show: true
              });
              this.props.onUpdatePrice(datapoint.price, this.state.show);
            }}
          />
          {show ? (
            <MarkSeries
              data={[hoveredNode]}
              style={{ fill: this.props.marketIsUp ? '#21ce99' : '#f45531' }}
            />
          ) : null}
          {show ? (
            <Crosshair values={[hoveredNode]} className="crosshair">
              {this.props.showDay ? (
                <div style={{ background: 'transparent' }}>
                  <p>{hoveredNode.time}</p>
                </div>
              ) : null}
              {this.props.showWeek ? (
                <div style={{ background: 'transparent' }}>
                  <p>{hoveredNode.dateTime}</p>
                </div>
              ) : null}
              {this.props.showMonth ? (
                <div style={{ background: 'transparent' }}>
                  <p>{hoveredNode.date}</p>
                </div>
              ) : null}
            </Crosshair>
          ) : null}
        </XYPlot>
      </div>
    );
  }
}

export default Graph;
