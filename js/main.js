import { model } from "../admin/js/Model/hau_model.js";
let products = model.keyboards;
let switchList = ["red", "brown","blue"]

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Input
let numAllProducts = products.length; // tổng số products
let numProductsPerPage = 8; // số lượng products mỗi trang
let idPage = 1; // id page khởi đầu
const numBtnPgn = 5; // số nút bấm chuyển trang hiện ra
let idLastPage = // id page cuối cùng
  numAllProducts % numProductsPerPage === 0
    ? Math.floor(numAllProducts / numProductsPerPage)
    : Math.floor(numAllProducts / numProductsPerPage) + 1;

// const switches = ['blue', 'red', 'brown'];

let productsCart = []; // products có trong cart của khách hàng sau khi đăng nhập
let purchasedProduct = []; // products mà khách hàng đã mua hangf

// Thực thi
const promise = new Promise((resolve, reject) => {
  const bodyBlock = $('.hieu-root');
  if (bodyBlock) resolve(showBody(bodyBlock));
  else reject('Not found <div class="hieu-root"></div>');
});

promise
  .then(() => {
    renderProducts(products);
  })
  .then(() => {
    handlePgn(renderPgn(1, Math.ceil(products.length/8)));
  })
  .then(() => {
    showModalCart(checkLogin());
  })
  .catch((errorMess) => {
    console.log(errorMess);
  });

function showBody(bodyBlock) {
  bodyBlock.innerHTML = `<div class="grid wide">
    <!-- Header cart -->
    <div class="hieu-header__cart">
      <div class="hieu-header__cart-container">
        <img
          class="hieu-header__cart-img"
          src="./img/cart-shopping-solid.svg"
          alt=""
        />
      </div>
    </div>
    <!-- App content -->
    <div class="row sm-gutters hieu-app-content">
      <div class="col l-12 m-12 c-12">
        <div class="hieu-content__container">
          <div class="row sm-gutters hieu-product__container"></div>
        </div>
        <ul class="hieu-content__pagination"></ul>
      </div>
    </div>
  </div>
  <!-- Modal cart layout -->
  <div class="hieu-modal-cart">
    <div class="hieu-modal-cart__overlay"></div>
    <div class="hieu-modal-cart__body">
      <div class="hieu-modal-cart__header">MY CART
        <i class="fa-solid fa-cart-shopping hieu-modal-cart__cart-icon"></i>
        <div class="hieu-modal-cart__btn-close">
          <i class="fa-solid fa-xmark"></i>
        </div>  
      </div> 
      <div class="hieu-modal-cart__inner"></div>
    </div>
  </div class="hieu-modal-cart">
  <div class="hieu-modal-detail">
    <div class="hieu-modal-detail__overlay"></div>
    <div class="hieu-modal-detail__body">
      <div class="hieu-modal-cart__header">CHI TIẾT SẢN PHẨM
        <div class="hieu-modal-detail__btn-close">
          <i class="fa-solid fa-xmark"></i>
        </div>  
      </div>
      <div class="hieu-modal-detail__inner"></div>
    </div>
  </div>
  <div class="hieu-modal-notification">
    <div class="hieu-modal-notification__overlay"></div>
    <div class="hieu-modal-notification__body">
      <div class="hieu-modal-cart__header">THÊM VÀO GIỎ HÀNG
      </div>
      <div class="hieu-modal-notification__inner">Thành công
        <i class="fa-solid fa-circle-check"></i>
      </div>
    </div>
  </div>
  <div class="hieu-modal-notification">
    <div class="hieu-modal-notification__overlay"></div>
    <div class="hieu-modal-notification__body">
      <div class="hieu-modal-cart__header">THANH TOÁN
      </div>
      <div class="hieu-modal-notification__inner">Lựa chọn ít nhất 1 sản phẩm để thanh toán
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
    </div>
  </div>`;
}

const renderProducts = function renderProducts(productsList) {
  products = productsList;
  const blockCtnProducts = $('.hieu-product__container');

  numAllProducts = productsList.length;
  console.log(productsList)
  numProductsPerPage =
    numAllProducts <= numProductsPerPage ? numAllProducts : 8;
  // if(numProductsPerPage == 0) {
  //   numProductsPerPage
  // }

  var filterProducts = productsList.filter((product,index) => {
    return (
      index + 1 > numProductsPerPage * (idPage - 1) &&
      index + 1 <= numProductsPerPage * idPage
    );
  });

  let html = filterProducts.map((product) => {
    return `<div class="col l-3 m-4 c-6">
      <div class="hieu-product__container-product">
        <div class="hieu-product">
          <div 
            class="hieu-product__img" 
            style="background-image: url(../img/products/${product.img[0]})
          ">
            <div class="hieu-product__name">
              <p>${product.name}</p>
            </div>
            <div class="hieu-product__price">
              ${product.price}<span>đ</span>            
            </div>
            <div class="hieu-product__wires">
              <div>${product.wires}</div>
            </div>
          </div>
        </div>
        <div class="hieu-product__btn-container">
            <div class="hieu-product__btn-details" id="product-id-${product.id}">
              <span class="text">Mua ngay</span>
            </div>
            <input 
              type="checkbox" 
              id="checkbox-product-${product.id}"
              style="display: none"
            />
            <label
              for="checkbox-product-${product.id}"
              class="hieu-product__btn-add-cart"
            >
              <div class="hieu-product__btn-add-text-1" data-attr="Add to">
                Add to
              </div>
              <div class="hieu-product__btn-add-text-2" data-attr="cart">
                cart
              </div>
            </label>
          </div>
        </div>
      </div>`;
  });
  blockCtnProducts.innerHTML = html.join('');
  
}

const renderPgn = function renderPgn(idStartPage, idEndPage) {
  numAllProducts = products.length
  idLastPage = // id page cuối cùng
  numAllProducts % numProductsPerPage === 0
    ? Math.floor(numAllProducts / numProductsPerPage)
    : Math.floor(numAllProducts / numProductsPerPage) + 1;
  const pgnBlock = $('.hieu-content__pagination');

  console.log(idLastPage)

  var idFirstPage = idStartPage;
  if (idLastPage < numBtnPgn) {
    idEndPage = idLastPage;
  }

  var btnPages = ``;

  // Trường hợp render ngược chiều
  if (idStartPage > idEndPage) {
    for (var count = idEndPage; count <= idStartPage; count++) {
      btnPages +=
        count == idStartPage
          ? `<li class="hieu-content__pagination-item select">${count}</li>`
          : `<li class="hieu-content__pagination-item">${count}</li>`;
    }
  }

  // Trường hợp render đúng chiều
  if (idStartPage <= idEndPage) {
    if (idStartPage == idEndPage && idEndPage != 1) {
      idFirstPage = idEndPage - numBtnPgn + 1;
      for (var count = idFirstPage; count <= idEndPage; count++) {
        btnPages +=
          count == idEndPage
            ? `<li class="hieu-content__pagination-item select">${count}</li>`
            : `<li class="hieu-content__pagination-item ">${count}</li>`;
      }
    } else if (idStartPage == idEndPage && idEndPage == 1) {
      idEndPage = idStartPage + numBtnPgn - 1;
      for (var count = idFirstPage; count <= idEndPage; count++) {
        btnPages +=
          count == 1
            ? `<li class="hieu-content__pagination-item select">${count}</li>`
            : `<li class="hieu-content__pagination-item">${count}</li>`;
      }
    } else if (idStartPage < idEndPage) {
      if (idEndPage > idLastPage) idEndPage = idLastPage;
      for (var count = idFirstPage; count <= idEndPage; count++) {
        btnPages +=
          count == idFirstPage
            ? `<li class="hieu-content__pagination-item select">${count}</li>`
            : `<li class="hieu-content__pagination-item">${count}</li>`;
      }
    }
  }
  pgnBlock.innerHTML = btnPages;
  return pgnBlock;
}

// Xử lý phân trang
const handlePgn = function handlePgn(pgnBlock) {
  let blockCtnProducts = $('.hieu-product__container');
  const listBtnPgn = [];

  pgnBlock.childNodes.forEach((blockBtn) => {
    listBtnPgn.push(blockBtn);
    return listBtnPgn;
  });

  const startBtnPage = listBtnPgn[0];
  const endBtnPage = listBtnPgn[numBtnPgn - 1];

  // Xử lý nút bấm số trang
  listBtnPgn.forEach((btn) => {
    btn.onclick = function () {
      $('.hieu-content__pagination-item.select').classList.remove('select');
      this.classList.add('select');

      idPage = Number(this.innerText);
      renderProducts(products);

      // Xử lý khi ấn nút số (trang) đầu
      if (this === startBtnPage) {
        var idSelectBtn = Number(this.innerText);
        var idFirstBtn = idSelectBtn - numBtnPgn + 1;
        idFirstBtn = idFirstBtn <= 0 ? 1 : idFirstBtn;
        handlePgn(renderPgn(idSelectBtn, idFirstBtn));
      }

      // Xử lý khi ấn nút số (trang) cuối
      else if (this === endBtnPage) {
        var idSelectBtn = Number(this.innerText);
        var idEndBtn =
          idSelectBtn == idLastPage ? idSelectBtn : idSelectBtn + numBtnPgn - 1;
        handlePgn(renderPgn(idSelectBtn, idEndBtn));
      } else {
        blockCtnProducts = $('.hieu-product__container');
        handleAddToCart(blockCtnProducts, products);
        handlePurchaseNow(blockCtnProducts, products);
        showModalProductDetail();
      }
    };
  });
  handleAddToCart(blockCtnProducts, products);
  handlePurchaseNow(blockCtnProducts, products);
  showModalProductDetail();
}

// Kiểm tra khách hàng đã login chưa
function checkLogin() {
  let login = true;
  return login;
}

// Xử lý khi ấn nút thêm product vào cart
function handleAddToCart(block, products) {
  const listBtnAddCart = block.querySelectorAll('.hieu-product__btn-add-cart');
  const modalInnerBlock = $('.hieu-modal-cart__inner');

  listBtnAddCart.forEach((btn) => {
    btn.onclick = function () {
      if (productsCart.length == 0) showModalCartProducts(modalInnerBlock);
      const checkbox = btn.parentNode.querySelector('input[type=checkbox]');

      products.forEach((product) => {
        if (`checkbox-product-${product.id}` == checkbox.id) {
          productsCart.push(product);
          showModalCartProducts(modalInnerBlock);
          addProductsAtCart(productsCart);
        }
      });

      notifySuccess();
    };
  });

  // Modal thông báo thành công
  function notifySuccess() {
    const modalNotification = $('.hieu-modal-notification');
    modalNotification.style.display = 'block';
    setTimeout(hideModal, 1500);
    function hideModal() {
      modalNotification.style.display = 'none';
    }
  }
}

// Xử lý mua ngay
function handlePurchaseNow(block, products) {
  const listBtnPurchase = block.querySelectorAll('.hieu-product__btn-details');
  const modalInnerBlock = $('.hieu-modal-cart__inner');

  listBtnPurchase.forEach((btn) => {
    btn.onclick = () => {
      disableScoll();
      products.forEach((product) => {
        if (`product-id-${product.id}` == btn.id) {
          productsCart.push(product);
          showModalCartProducts(modalInnerBlock);
          addProductsAtCart(productsCart);
          showModalCart();
        }
      });
    };
  });

  function showModalCart() {
    const modalBlock = $('.hieu-modal-cart');
    modalBlock.style.display = 'block';
    removeProductAtCart(productsCart);
    changeQuantityProduct();
    handleBtnSelectAll();
    handleBtnRemoveAll();
    handleBtnPurchase();
  }
}

// Modal cart layout
function showModalCart(checkLogin) {
  const cartIcon = $('.hieu-header__cart-container');
  const closeModalIcon = $('.hieu-modal-cart__btn-close i');
  const modalBlock = $('.hieu-modal-cart');
  const modalInnerBlock = $('.hieu-modal-cart__inner');

  if (!checkLogin) {
    showModalCartNoLogin(modalInnerBlock);
  } else if (productsCart.length == 0) {
    showModalCartNoProducts(modalInnerBlock);
  } else showModalCartProducts(modalInnerBlock);

  cartIcon.onclick = function () {
    disableScoll();
    modalBlock.style.display = 'block';
    if (productsCart.length != 0) {
      removeProductAtCart(productsCart);
      changeQuantityProduct();
      handleBtnSelectAll();
      handleBtnRemoveAll();
      handleBtnPurchase();
    }
  };
  closeModalIcon.onclick = function () {
    modalBlock.style.display = 'none';
    activeScroll();
  };
}

function showModalCartNoLogin(modalInnerBlock) {
  modalInnerBlock.innerHTML = `<div class="hieu-modal-cart__img-container">
      <img
        class="hieu-modal-cart__img--no-login"
        src="./img/login_img.png"
        alt=""
      />
      <div class="hieu-modal-cart__text--no-login">
        Đăng nhập để thêm sản phẩm vào giỏ hàng
      </div>
    </div>
    <div class="hieu-modal-cart__btn-container">
      <div class="hieu-modal-cart__btn--sign-up">Đăng ký</div>
      <div class="hieu-modal-cart__btn--login">Đăng nhập</div>
    </div>`;
}

function showModalCartNoProducts(modalInnerBlock) {
  modalInnerBlock.parentNode.style.width = '500px';
  modalInnerBlock.innerHTML = `<div class="hieu-modal-cart__img-container">
    <img
      class="hieu-modal-cart__img--no-login"
      src="./img/login_img.png"
      alt=""
    />
    <div class="hieu-modal-cart__text--no-login">
      Chưa có sản phẩm trong giỏ hàng của bạn
    </div>
  </div>`;
}

function showModalCartProducts(modalInnerBlock) {
  modalInnerBlock.parentNode.style.width = '1100px';
  modalInnerBlock.innerHTML = `<div class="hieu-modal-cart__container-products">
      <ul class="hieu-modal-cart__header-info">
        <li></li>
        <li class="hieu-modal-cart__header-color">Màu sắc</li>
        <li class="hieu-modal-cart__header-led">LED</li>
        <li class="hieu-modal-cart__header-switch">Switch</li>
        <li></li>
      </ul>
      <ul class="hieu-modal-cart__list-products"></ul>
      <div class="hieu-modal-cart__container-payment">
        <div class="hieu-modal-cart__checkbox-payment"></div>
        <div class="hieu-modal-cart__container-btn-payment">
          <button class="hieu-btn-select-all-products">
            Chọn Tất Cả
          </button>
          <button class="hieu-btn-remove-products">
            Xóa Tất Cả
          </button>
        </div>
        <div class="hieu-modal-cart__container-total-payment">
          <div class="total-payment--text">Số lượng sản phẩm:</div> 
          <span class="hieu-quantity-products">${productsCart.length}</span>
          <span>sản phẩm</span>
        <button class="hieu-btn-purchase">Mua Hàng</button>
      </div>
    </div>`;
}

function addProductsAtCart(products) {
  const blockListPros = $('.hieu-modal-cart__list-products');
  let html = products.map((product) => {
    const colorProduct = `<div 
      class="circle active" 
      style="background: ${product.color}">
    </div>`;

    const switchProduct = () => {
      const switchesOption = document.createElement('select');
      switchesOption.id = 'switches';
      switchesOption.name = 'switches';

      let html = switchList.map((switchProduct) => {
        return `<option 
            value="${switchProduct}">
            ${switchProduct}
          </option>`;
      });
      switchesOption.innerHTML = html.join('');

      return switchesOption.outerHTML;
    };

    return `<li>
    <div class="hieu-modal-cart__checkbox-product">
      <input 
      type="checkbox" 
      id="checkbox-product-${product.id}" 
      />
    </div>
    <ul class="hieu-modal-cart__info-product">
      <li class="hieu-modal-cart__product-img">
        <img
        class="hieu-modal-cart__product-image"
        src="./img/products/${product.img[0]}"
        alt=""
        />
      </li>
      <li class="hieu-modal-cart__product-name">
        <p class="hieu-modal-cart__product-text">${product.name}</p>
        <div>
          <p class="hieu-modal-cart__product-brand">${product.brand}</p>
        </div>
      </li>
      <li class="hieu-modal-cart__product-price">${product.price}
        <span>đ</span>
      </li>
      <li class="hieu-modal-cart__product-quantity">
        <div class="hieu-modal-cart__product-quantity-btn">
          <button class="hieu-modal-cart__product-quantity--minus">-</button>
            <input 
              type="text" 
              class="hieu-modal-cart__product-quantity--text"
              value="1"
            >
          <button class="hieu-modal-cart__product-quantity--plus">+</button>
        </div>
      </li>
      <li class="hieu-modal-cart__product-color">
        <div class="container">
          ${colorProduct}
        </div>
      </li>
      <li class="hieu-modal-cart__product-led">
        <div class="container">
            ${product.led}
          </div>
      </li>
      <li class="hieu-modal-cart__product-switch">
        <div class="container">
            ${switchProduct()}
        </div>
      </li>
      <li class="hieu-modal-cart__product-btn-remove">
        <i class="fa-solid fa-xmark"></i>
      </li>
    </ul>
  </li>`;
  });
  blockListPros.innerHTML = html.join('');
}

function removeProductAtCart(products) {
  const blocksBtnRemoveProduct = $$('.hieu-modal-cart__product-btn-remove i');
  const modalInnerBlock = $('.hieu-modal-cart__inner');

  blocksBtnRemoveProduct.forEach((btn) => {
    btn.onclick = function () {
      if (products.length == 1) {
        products.splice(0, 1);
        showModalCartNoProducts(modalInnerBlock);
      } else
        for (const key of blocksBtnRemoveProduct.keys()) {
          if (blocksBtnRemoveProduct.item(key) == btn) {
            products.splice(key, 1);
            showModalCartProducts(modalInnerBlock);
            addProductsAtCart(products);
            removeProductAtCart(products);
          }
        }
    };
  });
}

// Xử lý input số lượng sản phẩm
function changeQuantityProduct() {
  const blockQuantityProduct = $$('.hieu-modal-cart__product-quantity-btn');
  blockQuantityProduct.forEach((block) => {
    const btnMinus = block.querySelector(
      '.hieu-modal-cart__product-quantity--minus'
    );
    const btnPlus = block.querySelector(
      '.hieu-modal-cart__product-quantity--plus'
    );
    const inputQuantity = block.querySelector(
      '.hieu-modal-cart__product-quantity--text'
    );
    let quantityProduct = inputQuantity.value;

    inputQuantity.onblur = () => {
      if (inputQuantity.value == '' || inputQuantity.value < 1) {
        alert('Số lượng sản phẩm ít nhất là 1');
        inputQuantity.value = 1;
      } else quantityProduct = inputQuantity.value;
    };

    btnMinus.onclick = () => {
      if (quantityProduct == 1) {
        alert('Số lượng sản phẩm ít nhất là 1');
        quantityProduct = 1;
        inputQuantity.value = quantityProduct;
      } else {
        quantityProduct--;
        inputQuantity.value = quantityProduct;
      }
    };
    btnPlus.onclick = () => {
      quantityProduct++;
      inputQuantity.value = quantityProduct;
    };
  });
}

function handleBtnSelectAll() {
  const btnSelectAll = $('.hieu-btn-select-all-products');
  const listCheckbox = $$('.hieu-modal-cart__checkbox-product input');

  btnSelectAll.onclick = () => {
    listCheckbox.forEach((checkbox) => {
      checkbox.checked = true;
    });
  };
}

function handleBtnRemoveAll() {
  const btnRemoveAll = $('.hieu-btn-remove-products');
  const modalInnerBlock = $('.hieu-modal-cart__inner');

  btnRemoveAll.onclick = () => {
    productsCart = [];
    showModalCartNoProducts(modalInnerBlock);
  };
}

function handleBtnPurchase() {
  const btnPurchase = $('.hieu-btn-purchase');
  const listCheckbox = $$('.hieu-modal-cart__checkbox-product input');

  btnPurchase.addEventListener('click', checkProducts);

  function checkProducts() {
    let checkedProducts = [];
    listCheckbox.forEach((checkbox) => {
      if (checkbox.checked) {
        const blockProduct = checkbox.closest('li');
        const id = checkbox.id.split('-')[2];
        const quantity = blockProduct.querySelector(
          '.hieu-modal-cart__product-quantity--text'
        ).value;
        let switchProduct = blockProduct.querySelector(
          '.hieu-modal-cart__product-switch .container #switches'
        ).value;
        checkedProducts.push({
          id,
          qty: quantity,
          switchProduct,
        });
      }
    });
    if (checkedProducts.length == 0) notifyFail();
    else model.addNewOrder(checkedProducts);
  }

  function notifyFail() {
    const modalNotification = $$('.hieu-modal-notification')[1];
    const modalBody = modalNotification.querySelector(
      '.hieu-modal-notification__body'
    );
    const modalInner = modalNotification.querySelector(
      '.hieu-modal-notification__inner'
    );
    const modalIconWarning = modalNotification.querySelector('i');
    modalBody.style.width = '300px';
    modalInner.style.width = '65%';
    modalInner.style.fontSize = '16px';
    modalIconWarning.style.color = 'orange';
    modalNotification.style.display = 'block';
    setTimeout(hideModal, 1500);
    function hideModal() {
      modalNotification.style.display = 'none';
    }
  }
}

function showModalProductDetail() {
  const blockProducts = $$('.hieu-product__container-product .hieu-product');
  const modalProductDetail = $('.hieu-modal-detail');
  const closeModalIcon = $('.hieu-modal-detail__btn-close i');

  blockProducts.forEach((block) => {
    block.onclick = () => {
      disableScoll();
      const idProduct = block.parentNode
        .querySelector('.hieu-product__btn-container input')
        .id.split('-')[2];
      modalProductDetail.style.display = 'block';
      products.forEach((product) => {
        if (product.id == idProduct) showProductDetail(product);
      });
    };
  });

  closeModalIcon.onclick = () => {
    modalProductDetail.style.display = 'none';
    activeScroll();
  };
}

function showProductDetail(product) {
  const modalDetailInner = $('.hieu-modal-detail__inner');

  modalDetailInner.innerHTML = `<div class="hieu-product-detail__container">
    ${showSlideProductImgs()}
    <div class="hieu-product-detail__info">
      <div class="hieu-product-detail__name">${product.name}</div>
      <div class="hieu-product-detail__price">${product.price}<span>đ</span>
      </div>
      <p>Thông số kỹ thuật</p>
      <table class="hieu-product-detail__table-info">
        <tr class="hieu-product-detail__brand">
          <th>Hãng:</th>
          <th>${product.brand}</th>
        </tr>
        <tr class="hieu-product-detail__wire">
          <th>Loại kết nối:</th>
          <th class="hieu-product-detail__wire-name"></th>
        </tr>
        <tr class="hieu-product-detail__led">
          <th>LED:</th>
          <th>${product.led}</th>
        </tr>
        <tr class="hieu-product-detail__color">
          <th>Màu sắc:</th>
          <th>${product.color}</th>
        </tr>
        <tr class="hieu-product-detail__switch">
          <th>Loại switch:</th>
          ${showSwitchesBtn()}
        </tr>
        <tr class="hieu-product-detail__quantity">
          <th>Số lượng:</th>
          ${showQuantityBtn()}
        </tr>
      </table>
      <div class="hieu-product-detail__btn">
        <div class="hieu-product__btn-container">
            <div class="hieu-product__btn-details" id="product-id-${
              product.id
            }">
              <span class="text">Mua ngay</span>
            </div>
            <input type="checkbox" id="checkbox-product-${
              product.id
            }" style="display: none">
            <label for="checkbox-product-${
              product.id
            }" class="hieu-product__btn-add-cart">
              <div class="hieu-product__btn-add-text-1" data-attr="Add to">
                Add to
              </div>
              <div class="hieu-product__btn-add-text-2" data-attr="cart">
                cart
              </div>
            </label>
          </div>
      </div>
    </div>
  </div>`;

  handleSlideImgs(modalDetailInner);
  showWiresInfo(modalDetailInner);
  handleBtnSwitches(modalDetailInner);
  handleQuantityBtn(modalDetailInner);
  handleButtons(modalDetailInner);

  function showSlideProductImgs() {
    const sliderCtn = document.createElement('div');
    const sliderImgs = document.createElement('div');
    const sliderBtn = document.createElement('div');
    const sliderDots = document.createElement('div');

    sliderCtn.className = 'hieu-product-detail__slider-container';
    sliderImgs.className = 'slider-imgs';
    sliderBtn.className = 'slider-btn';
    sliderDots.className = 'slider-dots';

    sliderImgs.innerHTML = product.img
      .map((img, index) => {
        return `<div class="slider-img fade">
          <div class="number-text">${(index += 1)} / ${product.img.length}</div>
          <img src="./img/products/${img}"/>
        </div>`;
      })
      .join('');
    sliderBtn.innerHTML = `<a class="prev">&#10094;</a><a class="next">&#10095;</a>`;
    sliderDots.innerHTML = product.img
      .map((img) => {
        return `<img class="dot" src="./img/products/${img}"/>`;
      })
      .join('');

    sliderCtn.appendChild(sliderImgs);
    sliderCtn.appendChild(sliderBtn);
    sliderCtn.appendChild(sliderDots);

    return sliderCtn.outerHTML;
  }

  function showWiresInfo(modalInnerBlock) {
    const blockWiresInfo = modalInnerBlock.querySelector(
      '.hieu-product-detail__wire-name'
    );
    const infoWires = product.wires.split('/');
    blockWiresInfo.innerHTML = infoWires
      .map((wire) => {
        wire = wire.trim();
        return `<p>${wire}</p>`;
      })
      .join('');
  }

  function showSwitchesBtn() {
    const blockCtnSwitches = document.createElement('th');
    blockCtnSwitches.className = 'hieu-product-detail__switch-name';

    blockCtnSwitches.innerHTML = switchList.map((switchProduct) => {
        return `<input 
          type="radio" 
          id="${switchProduct}Color"
          name="switchesProduct"
          value="${switchProduct}"
        ><label for="${switchProduct}Color"><div>${switchProduct}</div></label>`;
      })
      .join('');

    return blockCtnSwitches.outerHTML;
  }

  function showQuantityBtn() {
    const blockQuantity = document.createElement('th');
    blockQuantity.className = 'hieu-product-detail__quantity-container';
    blockQuantity.innerHTML = `<div class="hieu-product-detail__product-quantity-btn">
      <button class="hieu-product-detail__product-quantity--minus">-</button>
      <input type="text" class="hieu-product-detail__product-quantity--text" value="1">
      <button class="hieu-product-detail__product-quantity--plus">+</button>
    </div>`;
    return blockQuantity.outerHTML;
  }

  function handleQuantityBtn(modalInnerBlock) {
    const ctnQuantity = modalInnerBlock.querySelector(
      '.hieu-product-detail__quantity-container'
    );
    const btnMinus = ctnQuantity.querySelector(
      '.hieu-product-detail__product-quantity--minus'
    );
    const btnPlus = ctnQuantity.querySelector(
      '.hieu-product-detail__product-quantity--plus'
    );
    const inputQuantity = ctnQuantity.querySelector(
      '.hieu-product-detail__product-quantity--text'
    );
    let quantityProduct = inputQuantity.value;

    inputQuantity.onblur = () => {
      if (inputQuantity.value == '' || inputQuantity.value < 1) {
        alert('Số lượng sản phẩm ít nhất là 1');
        inputQuantity.value = 1;
      } else quantityProduct = inputQuantity.value;
    };

    btnMinus.onclick = () => {
      if (quantityProduct == 1) {
        alert('Số lượng sản phẩm ít nhất là 1');
        quantityProduct = 1;
        inputQuantity.value = quantityProduct;
      } else {
        quantityProduct--;
        inputQuantity.value = quantityProduct;
      }
    };

    btnPlus.onclick = () => {
      quantityProduct++;
      inputQuantity.value = quantityProduct;
    };
  }

  function handleSlideImgs(modalInnerBlock) {
    const btnBlocks = modalInnerBlock.querySelectorAll(
      '.hieu-product-detail__slider-container a'
    );
    const dotsBlocks = modalInnerBlock.querySelectorAll(
      '.hieu-product-detail__slider-container .dot'
    );

    const btnPre = btnBlocks[0];
    const btnNext = btnBlocks[1];

    btnPre.onclick = () => {
      plusSlides(-1);
    };

    btnNext.onclick = () => {
      plusSlides(1);
    };

    dotsBlocks.forEach((dot, index) => {
      dot.onclick = () => {
        currentSlide(index + 1);
      };
    });

    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(index) {
      showSlides((slideIndex += index));
    }

    // Thumbnail image controls
    function currentSlide(index) {
      showSlides((slideIndex = index));
    }

    function showSlides(index) {
      let i;
      let slides = modalInnerBlock.querySelectorAll('.slider-img');

      if (index > slides.length) {
        slideIndex = 1;
      }
      if (index < 1) {
        slideIndex = slides.length;
      }

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      for (i = 0; i < dotsBlocks.length; i++) {
        dotsBlocks[i].classList.remove('active');
      }

      slides[slideIndex - 1].style.display = 'block';
      dotsBlocks[slideIndex - 1].classList.add('active');
    }
  }

  function handleBtnSwitches(modalInnerBlock) {
    const blockCtnSwitches = modalInnerBlock.querySelector(
      '.hieu-product-detail__switch-name'
    );
    const switchesInputs = blockCtnSwitches.querySelectorAll('input');
    const switchesDiv = blockCtnSwitches.querySelectorAll('label div');

    switchesInputs[0].checked = true;
    switchesDiv.forEach((switchBtn, index) => {
      switchBtn.onclick = () => {
        showBtnSwitches(index + 1);
      };
    });

    let labelIndex = 1;
    showBtnSwitches(labelIndex);

    function showBtnSwitches(index) {
      let i;
      for (i = 0; i < switchesDiv.length; i++) {
        switchesDiv[i].classList.remove('active');
      }
      switchesDiv[index - 1].classList.add('active');
    }
  }
}

function handleButtons(blockCtn) {
  const ctnButtons = blockCtn.querySelector('.hieu-product__btn-container');
  ctnButtons.setAttribute(
    'style',
    'position: inherit; width: 250px; display: flex; flex-direction: row; justify-content: space-around'
  );
  handlePurchaseNow();
  handleAddToCart();

  function handlePurchaseNow() {
    const listBtnPurchase = blockCtn.querySelectorAll(
      '.hieu-product__btn-details'
    );
    const modalCartInner = $('.hieu-modal-cart__inner');

    listBtnPurchase.forEach((btn) => {
      btn.onclick = () => {
        products.forEach((product) => {
          if (`product-id-${product.id}` == btn.id) {
            productsCart.push(product);
            showModalCartProducts(modalCartInner);
            addProductsAtCart(productsCart);
            showModalCart();
          }
        });
      };

      function showModalCart() {
        const modalDetail = $('.hieu-modal-detail');
        const modalBlock = $('.hieu-modal-cart');
        modalDetail.style.display = 'none';
        modalBlock.style.display = 'block';
        removeProductAtCart(productsCart);
        changeQuantityProduct();
        handleBtnSelectAll();
        handleBtnRemoveAll();
        handleBtnPurchase();
      }
    });
  }

  function handleAddToCart() {
    const listBtnAddCart = blockCtn.querySelectorAll(
      '.hieu-product__btn-add-cart'
    );
    const modalCartInner = $('.hieu-modal-cart__inner');

    listBtnAddCart.forEach((btn) => {
      btn.onclick = function () {
        if (productsCart.length == 0) showModalCartProducts(modalCartInner);
        const checkbox = btn.parentNode.querySelector('input[type=checkbox]');

        products.forEach((product) => {
          if (`checkbox-product-${product.id}` == checkbox.id) {
            productsCart.push(product);
            showModalCartProducts(modalCartInner);
            addProductsAtCart(productsCart);
          }
        });

        notifySuccess();
      };
    });

    function notifySuccess() {
      const modalNotification = $('.hieu-modal-notification');
      modalNotification.style.display = 'block';
      setTimeout(hideModal, 1500);
      function hideModal() {
        modalNotification.style.display = 'none';
      }
    }
  }
}

function disableScoll() {
  const bodyBlock = $('.hieu-root');
  bodyBlock.style.height = '100vh';
  bodyBlock.style.overflowY = 'hidden';
}

function activeScroll() {
  const bodyBlock = $('.hieu-root');
  bodyBlock.style.height = '';
  bodyBlock.style.overflowY = '';
}

export{ renderProducts, renderPgn, handlePgn }