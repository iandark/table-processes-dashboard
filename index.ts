import { box, log, screen, Widgets } from "blessed";
import { preProcessFile } from 'typescript';
const contrib = require('blessed-contrib')

const defaultStyle = {
    style: {
        border: {
            fg: 'blue'
        },
        scrollbar: {
            bg: 'blue'
        },
        focus: {
            bg: 'red'
        },
    }
}

let screenDashboard = screen({
    smartCSR: true,
    ...defaultStyle
})

let logScreen: Widgets.Log = log({
    parent: screenDashboard,
    label: 'Server log',
    content: '',
    top: 0,
    padding: 1,
    right: 0,
    width: '50%',
    height: '100%',
    border: {
        type: 'line'
    },
    scrollable: true,
    ...defaultStyle
})

let serverUtilization = contrib.bar({
    label: 'Server utilization (%)',
    top: 0,
    left: 0,
    height: '50%',
    width: '50%',
    barWidth: 25,
    barSpacing: 15,
    xOffset: 15,
    maxHeight: 100,
    border: {
        type: 'line'
    },
    ...defaultStyle
})

screenDashboard.append(serverUtilization)
serverUtilization.setData( {
    titles: [ 'Billing (%)', 'Cart (%)' ],
    data: [ 13, 42 ]
})

let statusBilling = box({
    parent: screenDashboard,
    label: ' Billing Status ',
    content: '',
    top: '50%',
    left: 0,
    width: '50%',
    height: '25%',
    border: {
        type: 'line'
    },
    style: {
        bg: '#00AA00'
    }
})

let statusCart = box({
    parent: screenDashboard,
    label: ' Cart Status ',
    content: '',
    bottom: 0,
    left: 0,
    width: '50%',
    height: '25%',
    border: {
        type: 'line'
    },
    style: {
        bg: '#00AA00'
    }
})


screenDashboard.key( [ 'escape', 'q' ], () => {
    return process.exit(0)
});

screenDashboard.render();

setInterval( () => {
    logScreen.log( 'Warning - ' + Math.random())
    serverUtilization.setData( {
        titles: [ 'Billing (%)', 'Cart (%)' ],
        data: [
            Math.floor( Math.random() * 99) + 1,
            Math.floor( Math.random() * 99) + 1,
        ]
    })
    statusBilling.style.bg = 'red'
}, 2000)
