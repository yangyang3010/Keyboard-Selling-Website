import {model} from './hau_model.js'

export const handleEventStatistics = () => {
  let buttonStatisticProduct
  let buttonStatisticRevenue
  let buttonStatisticRevenueYear
  let fromDate
  let toDate
  let submitDate
  let submitYear
  let inputYear
  let tmpButtonProduct
  let tmpButtonRevenue
  let tmpButtonGraph
  tmpButtonProduct = false
  tmpButtonRevenue = false
  tmpButtonGraph = false
  buttonStatisticProduct = document.querySelector(".huy-button-statistic-product");
  buttonStatisticRevenue = document.querySelector(".huy-button-statistic-revenue");
  buttonStatisticRevenueYear = document.querySelector(".huy-button-statistic-revenue-year");
  fromDate = document.querySelector(".huy-input-date-from");
  toDate = document.querySelector(".huy-input-date-to");
  submitDate = document.querySelector(".huy-submit-date");
  submitYear = document.querySelector(".huy-submit-year");
  inputYear = document.querySelector(".huy-input-year");
  buttonStatisticProduct.addEventListener("click", () => {
    document.querySelector(".huy-date-picker").classList.remove("huy-date-picker-on");
    document.querySelector(".huy-year-picker").classList.remove("huy-year-picker-on");
    document.querySelector(".huy-table-header-statistic-revenue").classList.remove("huy-table-header-statistic-revenue-on");
    document.querySelector(".huy-graph-revenue").classList.remove("huy-graph-revenue-on");
    if (document.querySelector(".huy-table-statistic-revenue").contains(document.querySelector(".huy-table-item-revenue"))) {
      document.querySelectorAll(".huy-table-item-revenue").forEach(element => {
        element.classList.remove("huy-table-item-revenue-on");
      });
    }
    document.querySelector(".huy-date-picker").classList.add("huy-date-picker-on");
    document.querySelector(".huy-table-header-statistic-product").classList.add("huy-table-header-statistic-product-on");
    tmpButtonProduct = true
    tmpButtonRevenue = false
    tmpButtonGraph = false
  });
  buttonStatisticRevenue.addEventListener("click", () => {
    document.querySelector(".huy-date-picker").classList.remove("huy-date-picker-on");
    document.querySelector(".huy-year-picker").classList.remove("huy-year-picker-on");
    document.querySelector(".huy-table-header-statistic-product").classList.remove("huy-table-header-statistic-product-on");
    document.querySelector(".huy-graph-revenue").classList.remove("huy-graph-revenue-on");
    if (document.querySelector(".huy-table-statistic-product").contains(document.querySelector(".huy-table-item-product"))) {
      document.querySelectorAll(".huy-table-item-product").forEach(element => {
        element.classList.remove("huy-table-item-product-on");
      });
    }
    document.querySelector(".huy-date-picker").classList.add("huy-date-picker-on");
    document.querySelector(".huy-table-header-statistic-revenue").classList.add("huy-table-header-statistic-revenue-on");
    tmpButtonProduct = false
    tmpButtonRevenue = true
    tmpButtonGraph = false
  });
  buttonStatisticRevenueYear.addEventListener("click", () => {
    document.querySelector(".huy-date-picker").classList.remove("huy-date-picker-on");
    document.querySelector(".huy-date-picker").classList.remove("huy-date-picker-on");
    document.querySelector(".huy-table-header-statistic-revenue").classList.remove("huy-table-header-statistic-revenue-on");
    document.querySelector(".huy-table-header-statistic-product").classList.remove("huy-table-header-statistic-product-on");
    document.querySelector(".huy-year-picker").classList.add("huy-year-picker-on");
    if (document.querySelector(".huy-table-statistic-product").contains(document.querySelector(".huy-table-item-product"))) {
      document.querySelectorAll(".huy-table-item-product").forEach(element => {
        element.classList.remove("huy-table-item-product-on");
      });
    }
    if (document.querySelector(".huy-table-statistic-revenue").contains(document.querySelector(".huy-table-item-revenue"))) {
      document.querySelectorAll(".huy-table-item-revenue").forEach(element => {
        element.classList.remove("huy-table-item-revenue-on");
      });
    }
    tmpButtonProduct = false
    tmpButtonRevenue = false
    tmpButtonGraph = true
  });
  submitDate.addEventListener("click", () => {
    document.querySelector(".huy-table-statistic-revenue").innerHTML = '';
    document.querySelector(".huy-table-statistic-product").innerHTML = '';
    if (fromDate.value != "" && toDate.value != "") {
      // document.querySelector("").innerHTML = '';
      let sttCount = 0;
      let sttCountPD = 0;
      let tmpKeyBoard = new Object();
      let newFromDate = new Date(fromDate.value);
      let newToDate = new Date(toDate.value);
      let tmpTotalQtyRN = 0;
      let tmpTotalPriceRN = 0;
      if (newFromDate < newToDate) {
        for (let i = 0; i < model.orders.length; i++) {
          let totalQtyOrder = 0;
          if (newFromDate <= new Date(model.orders[i]['date']) && newToDate >= new Date(model.orders[i]['date']) && model.orders[i]['state'] == "process"){
            //CreateStatistic
            sttCount += 1;
            for (let j = 0; j < model.orders[i]['detail'].length; j++) {
              totalQtyOrder += Number(model.orders[i]['detail'][j]['qty']);
            }
            document.querySelector(".huy-table-statistic-revenue").innerHTML += `
            <div class="huy-table-item-revenue">
              <label>${sttCount}</label>
              <label>${new Date(model.orders[i]['date']).getDate()}/${new Date(model.orders[i]['date']).getMonth()+1}/${new Date(model.orders[i]['date']).getFullYear()}</label>
              <label>${model.orders[i]['id']}</label>
              <label>${totalQtyOrder}</label>
              <label>${model.orders[i]['totalPrice']}</label>
            </div>
            `;
            tmpTotalPriceRN += model.orders[i]['totalPrice'];
            tmpTotalQtyRN += totalQtyOrder;
            for (let j = 0; j < model.orders[i]['detail'].length; j++) {
              if (tmpKeyBoard.hasOwnProperty(model.orders[i]['detail'][j]['id']) == false) {
                for (let t = 0; t < model.keyboards.length; t++) {
                  if (model.orders[i]['detail'][j]['id'] == model.keyboards[t]['id']) {
                    tmpKeyBoard[`${model.orders[i]['detail'][j]['id']}`] = [Number(model.orders[i]['detail'][j]['qty']), model.keyboards[t]['name'], model.keyboards[t]['price']];
                    break;
                  }
                }
              }
              else {
                for (let t = 0; t < model.keyboards.length; t++) {
                  if (model.orders[i]['detail'][j]['id'] == model.keyboards[t]['id']) {
                    tmpKeyBoard[`${model.orders[i]['detail'][j]['id']}`][0] += Number(model.orders[i]['detail'][j]['qty']);
                    break;
                  }
                }
                // tmpKeyBoard[`${model.orders[i]['detail'][j]['id']}`][0] += Number(model.orders[i]['detail'][j]['qty']);
              }
            }
          }
        }
        document.querySelector(".huy-table-statistic-revenue").innerHTML += `
        <div class="huy-table-item-revenue">
          <label></label>
          <label>TOTAL</label>
          <label></label>
          <label>${tmpTotalQtyRN}</label>
          <label>${tmpTotalPriceRN}</label>
        </div>
        `;
        for (const [key, value] of Object.entries(tmpKeyBoard)) {
          sttCountPD += 1;
          document.querySelector(".huy-table-statistic-product").innerHTML += `
          <div class="huy-table-item-product">
            <label>${sttCountPD}</label>
            <label>${value[1]}</label>
            <label>${value[0]}</label>
            <label>${value[2]}</label>
            <label>${Number(value[0])*Number(value[2])}</label>
          </div>
          `;
        }
        let tmpTotalQtyPD = 0;
        let tmpTotalPricePD = 0;
        for (const [key, value] of Object.entries(tmpKeyBoard)) {
          tmpTotalQtyPD += Number(value[0]);
          tmpTotalPricePD += Number(value[0])*Number(value[2]);
        }
        document.querySelector(".huy-table-statistic-product").innerHTML += `
        <div class="huy-table-item-product">
          <label></label>
          <label>TOTAL</label>
          <label>${tmpTotalQtyPD}</label>
          <label></label>
          <label>${tmpTotalPricePD}</label>
        </div>
        `;
        if (tmpButtonProduct == true) {
          document.querySelectorAll(".huy-table-item-product").forEach(element => {
            element.classList.add("huy-table-item-product-on");
          });
          document.querySelectorAll(".huy-table-item-revenue").forEach(element => {
            element.classList.remove("huy-table-item-revenue-on");
          });
        }
        else if (tmpButtonRevenue == true) {
          document.querySelectorAll(".huy-table-item-product").forEach(element => {
            element.classList.remove("huy-table-item-product-on");
          });
          document.querySelectorAll(".huy-table-item-revenue").forEach(element => {
            element.classList.add("huy-table-item-revenue-on");
          });
        }
        else if (tmpButtonGraph == true) {
          document.querySelectorAll(".huy-table-item-product").forEach(element => {
            element.classList.remove("huy-table-item-product-on");
          });
          document.querySelectorAll(".huy-table-item-revenue").forEach(element => {
            element.classList.remove("huy-table-item-revenue-on");
          });
        }
      }
      else if (newFromDate.getDate() == newToDate.getDate() && newFromDate.getMonth() == newToDate.getMonth() && newFromDate.getFullYear() == newToDate.getFullYear()) {
        for (let i = 0; i < model.orders.length; i++) {
          let totalQtyOrder = 0;
          if (newFromDate.getDate() == new Date(model.orders[i]['date']).getDate() && newFromDate.getMonth() == new Date(model.orders[i]['date']).getMonth() && newFromDate.getFullYear() == new Date(model.orders[i]['date']).getFullYear() && model.orders[i]['state'] == "process"){
            //CreateStatistic
            sttCount += 1;
            for (let j = 0; j < model.orders[i]['detail'].length; j++) {
              totalQtyOrder += Number(model.orders[i]['detail'][j]['qty']);
            }
            document.querySelector(".huy-table-statistic-revenue").innerHTML += `
            <div class="huy-table-item-revenue">
              <label>${sttCount}</label>
              <label>${new Date(model.orders[i]['date']).getDate()}/${new Date(model.orders[i]['date']).getMonth()+1}/${new Date(model.orders[i]['date']).getFullYear()}</label>
              <label>${model.orders[i]['id']}</label>
              <label>${totalQtyOrder}</label>
              <label>${model.orders[i]['totalPrice']}</label>
            </div>
            `;
            tmpTotalPriceRN += model.orders[i]['totalPrice'];
            tmpTotalQtyRN += totalQtyOrder;
            for (let j = 0; j < model.orders[i]['detail'].length; j++) {
              if (tmpKeyBoard.hasOwnProperty(model.orders[i]['detail'][j]['id']) == false) {
                for (let t = 0; t < model.keyboards.length; t++) {
                  if (model.orders[i]['detail'][j]['id'] == model.keyboards[t]['id']) {
                    tmpKeyBoard[`${model.orders[i]['detail'][j]['id']}`] = [Number(model.orders[i]['detail'][j]['qty']), model.keyboards[t]['name'], model.keyboards[t]['price']];
                    break;
                  }
                }
              }
              else {
                for (let t = 0; t < model.keyboards.length; t++) {
                  if (model.orders[i]['detail'][j]['id'] == model.keyboards[t]['id']) {
                    tmpKeyBoard[`${model.orders[i]['detail'][j]['id']}`][0] += Number(model.orders[i]['detail'][j]['qty']);
                    break;
                  }
                }
                // tmpKeyBoard[`${model.orders[i]['detail'][j]['id']}`][0] += Number(model.orders[i]['detail'][j]['qty']);
              }
            }
          }
        }
        document.querySelector(".huy-table-statistic-revenue").innerHTML += `
        <div class="huy-table-item-revenue">
          <label></label>
          <label>TOTAL</label>
          <label></label>
          <label>${tmpTotalQtyRN}</label>
          <label>${tmpTotalPriceRN}</label>
        </div>
        `;
        for (const [key, value] of Object.entries(tmpKeyBoard)) {
          sttCountPD += 1;
          document.querySelector(".huy-table-statistic-product").innerHTML += `
          <div class="huy-table-item-product">
            <label>${sttCountPD}</label>
            <label>${value[1]}</label>
            <label>${value[0]}</label>
            <label>${value[2]}</label>
            <label>${Number(value[0])*Number(value[2])}</label>
          </div>
          `;
        }
        let tmpTotalQtyPD = 0;
        let tmpTotalPricePD = 0;
        for (const [key, value] of Object.entries(tmpKeyBoard)) {
          tmpTotalQtyPD += Number(value[0]);
          tmpTotalPricePD += Number(value[0])*Number(value[2]);
        }
        document.querySelector(".huy-table-statistic-product").innerHTML += `
        <div class="huy-table-item-product">
          <label></label>
          <label>TOTAL</label>
          <label>${tmpTotalQtyPD}</label>
          <label></label>
          <label>${tmpTotalPricePD}</label>
        </div>
        `;
        if (tmpButtonProduct == true) {
          document.querySelectorAll(".huy-table-item-product").forEach(element => {
            element.classList.add("huy-table-item-product-on");
          });
          document.querySelectorAll(".huy-table-item-revenue").forEach(element => {
            element.classList.remove("huy-table-item-revenue-on");
          });
        }
        else if (tmpButtonRevenue == true) {
          document.querySelectorAll(".huy-table-item-product").forEach(element => {
            element.classList.remove("huy-table-item-product-on");
          });
          document.querySelectorAll(".huy-table-item-revenue").forEach(element => {
            element.classList.add("huy-table-item-revenue-on");
          });
        }
        else if (tmpButtonGraph == true) {
          document.querySelectorAll(".huy-table-item-product").forEach(element => {
            element.classList.remove("huy-table-item-product-on");
          });
          document.querySelectorAll(".huy-table-item-revenue").forEach(element => {
            element.classList.remove("huy-table-item-revenue-on");
          });
        }
      }
      else if (newFromDate > newToDate) {
        alert("From date must less than to date");
      }
    }
    else if (fromDate.value == "" && toDate.value == "") {
      alert("Please enter from date and to date");
    }
    else if (fromDate.value == "") {
      alert("Please enter from date");
    }
    else {
      alert("Please enter to date");
    }
  });
  submitYear.addEventListener("click", () => {
    let tmpData = [0,0,0,0,0,0,0,0,0,0,0,0];
    let Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if (inputYear.value == "") {
      alert("Please enter year");
    } 
    else {
      for(let i = 0; i < model.orders.length; i++) {
        if (model.orders[i]['state'] == "process" && new Date(model.orders[i]['date']).getFullYear() == Number(inputYear.value)){
          let tmpMonth = new Date(model.orders[i]['date']).getMonth();
          tmpData[tmpMonth] += model.orders[i]['totalPrice'];
        }
      }
      const dataGraph = {
        labels: Months,
        datasets: [{
          label: 'Doanh thu theo từng tháng trong năm',
          data: tmpData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 153, 204, 0.2)',
            'rgba(191, 64, 64, 0.2)',
            'rgba(255, 102, 26, 0.2)',
            'rgba(230, 0, 115, 0.2)',
            'rgba(26, 26, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 153, 204)',
            'rgb(191, 64, 64)',
            'rgb(255, 102, 30)',
            'rgb(230, 0, 115)',
            'rgb(26, 26, 255)'
          ],
          borderWidth: 1
        }]
      };
      new Chart("huyChart", {
        type: 'bar',
        data: dataGraph,
        options: {
          tooltips: {
            callbacks: {
              label: (item) => `Doanh thu ${item.yLabel} VND`,
            },
          },
          scales: {
            y: {
              beginAtZero: true
            },
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Revenues',
                fontSize: 20
              },
              ticks: {
                // fontSize: 40
                beginAtZero: true
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Months',
                fontSize: 20
              },
              // ticks: {
              //   fontSize: 40
              //   beginAtZero: true
              // }
            }]
          }
        },
      });
      let monthRow = "<th>Month</th>";
      let revenueData = "<th>Revenue</th>";
      for (let i=0; i < Months.length; i++){
        monthRow += `
          <th>${Months[i]}</th>
        `
        revenueData += `<td>${tmpData[i]} VND</td>`
      }
      monthRow += "<th>TOTAL</th>"
      revenueData += `<th>${tmpData.reduce((a, b) => a + b, 0)} VND</th>`
      document.querySelector(".huy-graph-revenue").classList.add("huy-graph-revenue-on");
      document.querySelector(".huy-table-revenue").innerHTML = ''
      document.querySelector(".huy-table-revenue").innerHTML = `
      <tr>
        ${monthRow}
      </tr>
      <tr>
        ${revenueData}
      </tr>
      `
      // for (let i=0; i < Months.length; i++){
      //   document.querySelector(".huy-table-revenue").innerHTML += `
      //   <tr>
      //     <th>${Months[i]}</th>
      //     <th>${tmpData[i]} VND</th>
      //   </tr>
      //   ` 
      // }
      // document.querySelector(".huy-table-revenue").innerHTML += `
      // <tr>
      //   <th></th>
      //   <th>${tmpData.reduce((a, b) => a + b, 0)} VND</th>
      // </tr>
      // `
    }
  });
}