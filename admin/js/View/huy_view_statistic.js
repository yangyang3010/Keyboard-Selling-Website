export const statisticsView = {
  renderStatistics() {
    return `
    <div class="huy-statistic-button">
      <button class="huy-button-statistic-product">Thống kê sản phẩm</button>
      <button class="huy-button-statistic-revenue">Thống kê doanh thu</button>
      <button class="huy-button-statistic-revenue-year">Biểu đồ doanh thu từng tháng trong năm</button>
    </div>
    <div class="huy-date-picker">
      <div class="huy-date-from">
        <label for="huy-input-date-from">From</label>
      </div>
      <input class="huy-input-date-from" type="date">
      <div class="huy-date-to">
        <label for="huy-input-date-to">To</label>
      </div>
      <input class="huy-input-date-to" type="date">
      <button class="huy-submit-date">Submit</button>
    </div><br>
    <div class="huy-year-picker">
      <div class="huy-label-year">
        <label for="huy-input-year">Year for statistic</label>
      </div>
      <input class="huy-input-year" type="number" min="1" step="1" oninput="validity.valid||(value='')">
      <button class="huy-submit-year">Submit</button>
    </div>
    <br><br>

    <div class="huy-content">
      <div class="huy-table-header-statistic-revenue">
        <label>STT</label>
        <label>Ngày lập hóa đơn</label>
        <label>Mã hóa đơn</label>
        <label>Số lượng sản phẩm</label>
        <label>Thành tiền</label>
      </div>
      <div class = "huy-table-statistic-revenue">

      </div>
      <div class="huy-table-header-statistic-product">
        <label>STT</label>
        <label>Tên sản phẩm</label>
        <label>Số lượng</label>
        <label>Đơn giá</label>
        <label>Thành tiền</label>
      </div>
      <div class="huy-table-statistic-product">

      </div>
      <div class="huy-graph-revenue">
        <table class="huy-table-revenue">

        </table>
        <canvas id="huyChart" style="max-width:900px"></canvas>
      </div>
    </div>
    `
  }
}