export const viewAddProduct = {
  renderProductInfo() {
    return `
    <div class="huy-container-info-pd">
      <div class="huy-all-frame">
        <div class="huy-frame-edit-product">
          <div class="huy-frame-upload-img">
            <img class="huy-icon-upload-img" src="icon-upload-img.png" alt="" title="No File Upload">
            <div class="huy-text-no-file">No file chosen</div>
            <output class="huy-output-img"></output>
            <input class="huy-default-btn-upload" type="file" accept="image/jpeg,image/png,image/jpg" multiple="multiple" hidden>
          </div>
          <button onclick="btnChooseActive()" class="huy-button-upload">Choose your file</button>
          <div class="huy-text-name-pd">Name Product:</div>
          <input class="huy-input-name-pd" type="text" placeholder="Enter name of product">
          <div class="huy-text-price-pd">Price Product (VND):</div>
          <input class="huy-input-price-pd" type="number" placeholder="Enter price of product" min="1">
          <div class="huy-text-switch-pd">Switch Category:</div>
          <div class="huy-switch-checkbox">
            <label class="huy-label-red" for="huy-red">
              <input type="checkbox" id="huy-red" value="Red">
              Red
            </label>
            <label class="huy-label-brown" for="huy-brown">
              <input type="checkbox" id="huy-brown" value="Brown">
              Brown
            </label>
            <label class="huy-label-blue" for="huy-blue">
              <input type="checkbox" id="huy-blue" value="Blue">
              Blue
            </label>
            <label class="huy-label-membrane" for="huy-membrane">
              <input type="checkbox" id="huy-membrane" value="Membrane">
              Membrane
            </label>
          </div>
          <div class="huy-text-connect-pd">Connect Category:</div>
          <div class="huy-connect-checkbox">
            <label class="huy-label-bluetooth" for="huy-bluetooth">
              <input type="checkbox" id="huy-bluetooth" value="Bluetooth">
              Bluetooth
            </label>
            <label class="huy-label-wireless" for="huy-wireless">
              <input type="checkbox" id="huy-wireless" value="Wireless">
              Wireless
            </label>
            <label class="huy-label-wired" for="huy-wired">
              <input type="checkbox" id="huy-wired" value="Wired">
              Wired
            </label>
          </div>
          <div class="huy-text-led-pd">LED Category:</div>
          <div class="huy-led-checkbox">
            <label class="huy-label-rgb" for="huy-rgb">
              <input type="checkbox" id="huy-rgb" value="RGB">
              RGB
            </label>
            <label class="huy-label-rainbow" for="huy-rainbow">
              <input type="checkbox" id="huy-rainbow" value="Rainbow">
              Rainbow
            </label>
            <label class="huy-label-mono" for="huy-mono">
              <input type="checkbox" id="huy-mono" value="Mono">
              Mono
            </label>
            <label class="huy-label-noled" for="huy-noled">
              <input type="checkbox" id="huy-noled" value="No LED">
              No LED
            </label>
          </div>
          <div class="huy-text-brand-pd">Brand:</div>
          <select name="brand" id="huy-brand">
            <option value="" disabled selected hidden>Choose</option>
            <option value="Logitech">Logitech</option>
            <option value="IQUNIX">IQUNIX</option>
            <option value="Leopold">Leopold</option>
            <option value="DareU">DareU</option>
            <option value="Akko">Akko</option>
          </select>
          <button onclick="addBrand()" class="huy-add-brand">Add brand</button>
          <div class="huy-text-description-pd">Description:</div>
          <textarea class="huy-input-description-pd" name="" cols="30" rows="6"></textarea>
          <button class="huy-button-addqty-pd">Edit Quantity Product</button>
          <button onclick="btnCancelActive()" class="huy-button-cancel">Cancel</button>
          <button onclick="btnAcceptActive()" class="huy-button-accept">Accept</button>
        </div>
      </div>
    </div>
    <div class="huy-container-qty-pd">
      <div class="huy-frame-qty-pd">
        <div class="huy-frame-cate-qty-pd"></div>
        <button class="huy-button-cancel-frame-qty">Cancel</button>
        <button class="huy-button-accept-frame-qty">Accept</button>
      </div>
    </div>
    `
  }
}