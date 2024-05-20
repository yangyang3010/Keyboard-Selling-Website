const allFrame = document.querySelector(".huy-all-frame");
const defaultBtn = document.querySelector(".huy-default-btn-upload");
const closeBtn = document.querySelector(".huy-icon-close-img");
const myImg = document.querySelector(".huy-my-upload-img");
const frameImg = document.querySelector(".huy-frame-upload-img");
const inputNamePd = document.querySelector(".huy-input-name-pd");
const inputPricePd = document.querySelector(".huy-input-price-pd");
const inputNewQty = document.querySelector(".huy-input-newqty-pd");
const pdBrand = document.querySelector("#huy-brand");
const listSwitch = [];
const listConnect = [];
const listLed = [];
const listImg = [];
const listSwitchPd = [];
const listQtyPd = [];
const totalSwitch = document.querySelector(".huy-switch-checkbox").childNodes;
const totalConnect = document.querySelector(".huy-connect-checkbox").childNodes;
const totalLed = document.querySelector(".huy-led-checkbox").childNodes;
const totalUploadImg = document.querySelector(".huy-output-img").childNodes;

async function save(data) {
  filehandle = await window.showSaveFilePicker({
    suggestedName: "newFile",
  });
  let stream = await filehandle.createWritable();
  let name = filehandle.name;
  await stream.write(data);
  await stream.close();
  return name;
}

defaultBtn.addEventListener("change", (e) => {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const files = e.target.files;
    const output = document.querySelector(".huy-output-img");
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue;
      const picReader = new FileReader();
      picReader.addEventListener("load", async function (event) {
        const picFile = event.target;
        let nameImg = await save(files[i]);
        // console.log("/home/duchuy/Desktop/Img/" + nameImg);
        const div = document.createElement("div");
        div.classList.add("huy-active-frame-img");
        div.innerHTML = `<img class="huy-my-upload-img" src="${picFile.result}" title="${nameImg}" alt=""><img class="huy-icon-close-img" src="./icon-close-img.png" alt="" onclick="removeImg(this)">`;
        output.appendChild(div);
        document.querySelector(".huy-text-no-file").classList.add("huy-text-no-file-none");
        document.querySelector(".huy-icon-upload-img").classList.add("huy-icon-upload-img-none");
      });
      picReader.readAsDataURL(files[i]);
    }
  } else {
    alert("Your browser does not support File API !");
  }
});
document.querySelector(".huy-button-addqty-pd").addEventListener("click", function () {
    document.querySelectorAll(".huy-active-frame-qty-pd").forEach((e) => {
      e.remove();
    });
    listQtyPd.splice(0, listQtyPd.length);
    listSwitchPd.splice(0, listSwitchPd.length);
    for (let i = 0; i < totalSwitch.length; i++) {
      if (
        totalSwitch[i].className != null &&
        totalSwitch[i].childNodes[1].checked &&
        listSwitchPd.includes(totalSwitch[i].childNodes[1].value) == false
      ) {
        listSwitchPd.push(totalSwitch[i].childNodes[1].value);
      }
    }
    checkListConnect();
    checkListLed();
    if (
      listSwitchPd.length == 0 ||
      listConnect.length == 0 ||
      listLed.length == 0
    ) {
      alert("Please choose categories for product (Switch, Connect and LED) !");
    } else {
      document.querySelector(".huy-container-info-pd").classList.add("huy-container-info-pd-none");
      document.querySelector(".huy-container-qty-pd").classList.add("huy-container-qty-pd-active");
      console.log(listSwitchPd);
      for (let i = 0; i < listSwitchPd.length; i++) {
        const myDiv = document.createElement("div");
        myDiv.classList.add("huy-active-frame-qty-pd");
        myDiv.innerHTML = `<div class="huy-cate-pd">Switch ${listSwitchPd[i]}</div><input class="huy-number-pd" type="number" min="1">`;
        document.querySelector(".huy-frame-cate-qty-pd").appendChild(myDiv);
      }
    }
  });
document.querySelector(".huy-button-cancel-frame-qty").addEventListener("click", function () {
    document.querySelector(".huy-container-info-pd").classList.remove("huy-container-info-pd-none");
    document.querySelector(".huy-container-qty-pd").classList.remove("huy-container-qty-pd-active");
  });
document.querySelector(".huy-button-accept-frame-qty").addEventListener("click", function () {
    let checkNum = true;
    for (
      let i = 0;
      i < document.querySelector(".huy-frame-cate-qty-pd").childNodes.length;
      i++
    ) {
      if (
        document.querySelector(".huy-frame-cate-qty-pd").childNodes[i].childNodes[1].value == null ||
        document.querySelector(".huy-frame-cate-qty-pd").childNodes[i].childNodes[1].value <
          document.querySelector(".huy-frame-cate-qty-pd").childNodes[i]
            .childNodes[1].min
      ) {
        alert("Please enter exactly quantity of product (quantity >= 1)");
        checkNum = false;
        break;
      }
    }
    if (checkNum) {
      for (
        let i = 0;
        i < document.querySelector(".huy-frame-cate-qty-pd").childNodes.length;
        i++
      ) {
        listQtyPd.push(
          document.querySelector(".huy-frame-cate-qty-pd").childNodes[i].childNodes[1].value
        );
      }
      console.log(listQtyPd);
      document.querySelector(".huy-container-info-pd").classList.remove("huy-container-info-pd-none");
      document.querySelector(".huy-container-qty-pd").classList.remove("huy-container-qty-pd-active");
    }
  });
function btnChooseActive() {
  defaultBtn.click();
}
function removeImg(e) {
  e.parentElement.remove();
  if (document.querySelector(".huy-output-img").childNodes.length == 0) {
    document.querySelector(".huy-text-no-file").classList.remove("huy-text-no-file-none");
    document.querySelector(".huy-icon-upload-img").classList.remove("huy-icon-upload-img-none");
  }
}
function checkListSwitch() {
  if (
    document.querySelector("#huy-red").checked &&
    listSwitch.includes("Red") == false
  ) {
    listSwitch.push(document.querySelector("#huy-red").value);
  } else if (
    listSwitch.includes("Red") &&
    document.querySelector("#huy-red").checked == false
  ) {
    for (var i = 0; i < listSwitch.length; i++) {
      if (listSwitch[i] === "Red") {
        listSwitch.splice(i, 1);
      }
    }
  }
  if (
    document.querySelector("#huy-brown").checked &&
    listSwitch.includes("Brown") == false
  ) {
    listSwitch.push(document.querySelector("#huy-brown").value);
  } else if (
    listSwitch.includes("Brown") &&
    document.querySelector("#huy-brown").checked == false
  ) {
    for (var i = 0; i < listSwitch.length; i++) {
      if (listSwitch[i] === "Brown") {
        listSwitch.splice(i, 1);
      }
    }
  }
  if (
    document.querySelector("#huy-blue").checked &&
    listSwitch.includes("Blue") == false
  ) {
    listSwitch.push(document.querySelector("#huy-blue").value);
  } else if (
    listSwitch.includes("Blue") &&
    document.querySelector("#huy-blue").checked == false
  ) {
    for (var i = 0; i < listSwitch.length; i++) {
      if (listSwitch[i] === "Blue") {
        listSwitch.splice(i, 1);
      }
    }
  }
  if (
    document.querySelector("#huy-membrane").checked &&
    listSwitch.includes("Membrane") == false
  ) {
    listSwitch.push(document.querySelector("#huy-membrane").value);
  } else if (
    listSwitch.includes("Membrane") &&
    document.querySelector("#huy-membrane").checked == false
  ) {
    for (var i = 0; i < listSwitch.length; i++) {
      if (listSwitch[i] === "Membrane") {
        listSwitch.splice(i, 1);
      }
    }
  }
}
function checkListConnect() {
  if (
    document.querySelector("#huy-bluetooth").checked &&
    listConnect.includes("Bluetooth") == false
  ) {
    listConnect.push(document.querySelector("#huy-bluetooth").value);
  } else if (
    listConnect.includes("Bluetooth") &&
    document.querySelector("#huy-bluetooth").checked == false
  ) {
    for (var i = 0; i < listConnect.length; i++) {
      if (listConnect[i] === "Bluetooth") {
        listConnect.splice(i, 1);
      }
    }
  }
  if (
    document.querySelector("#huy-wireless").checked &&
    listConnect.includes("Wireless") == false
  ) {
    listConnect.push(document.querySelector("#huy-wireless").value);
  } else if (
    listConnect.includes("Wireless") &&
    document.querySelector("#huy-wireless").checked == false
  ) {
    for (var i = 0; i < listConnect.length; i++) {
      if (listConnect[i] === "Wireless") {
        listConnect.splice(i, 1);
      }
    }
  }
  if (
    document.querySelector("#huy-wired").checked &&
    listConnect.includes("Wired") == false
  ) {
    listConnect.push(document.querySelector("#huy-wired").value);
  } else if (
    listConnect.includes("Wired") &&
    document.querySelector("#huy-wired").checked == false
  ) {
    for (var i = 0; i < listConnect.length; i++) {
      if (listConnect[i] === "Wired") {
        listConnect.splice(i, 1);
      }
    }
  }
}
function checkListLed() {
  if (
    document.querySelector("#huy-rgb").checked &&
    listLed.includes("RGB") == false
  ) {
    listLed.push(document.querySelector("#huy-rgb").value);
  } else if (
    listLed.includes("RGB") &&
    document.querySelector("#huy-rgb").checked == false
  ) {
    for (var i = 0; i < listLed.length; i++) {
      if (listLed[i] === "RGB") {
        listLed.splice(i, 1);
      }
    }
  }
  if (
    document.querySelector("#huy-rainbow").checked &&
    listLed.includes("Rainbow") == false
  ) {
    listLed.push(document.querySelector("#huy-rainbow").value);
  } else if (
    listLed.includes("Rainbow") &&
    document.querySelector("#huy-rainbow").checked == false
  ) {
    for (var i = 0; i < listLed.length; i++) {
      if (listLed[i] === "Rainbow") {
        listLed.splice(i, 1);
      }
    }
  }
  if (
    document.querySelector("#huy-mono").checked &&
    listLed.includes("Mono") == false
  ) {
    listLed.push(document.querySelector("#huy-mono").value);
  } else if (
    listLed.includes("Mono") &&
    document.querySelector("#huy-mono").checked == false
  ) {
    for (var i = 0; i < listLed.length; i++) {
      if (listLed[i] === "Mono") {
        listLed.splice(i, 1);
      }
    }
  }
  if (
    document.querySelector("#huy-noled").checked &&
    listLed.includes("No LED") == false
  ) {
    listLed.push(document.querySelector("#huy-noled").value);
  } else if (
    listLed.includes("No LED") &&
    document.querySelector("#huy-noled").checked == false
  ) {
    for (var i = 0; i < listLed.length; i++) {
      if (listLed[i] === "No LED") {
        listLed.splice(i, 1);
      }
    }
  }
}
function addBrand() {
  var newBrand = document.createElement("option");
  var temp = prompt("Enter new brand: ");
  if (temp) {
    newBrand.text = temp;
    newBrand.value = newBrand.text;
    pdBrand.add(newBrand);
  }
}
function btnCancelActive() {
  allFrame.classList.add("huy-close-all-frame");
  document.querySelector(".huy-container-info-pd").classList.remove("huy-container-info-pd-on");
  //localStorage.clear();
}
function btnAcceptActive() {
  let checkName = false;
  let listProduct = localStorage.getItem("keyboards")?JSON.parse(localStorage.getItem("keyboards")):[];
  if (listProduct.length != 0) {
    for (let i = 0; i < listProduct.length; i++) {
      if (inputNamePd.value === listProduct[i]["name"]) {
        checkName = true;
        break;
      }
    }
  }
  var check = confirm("Do you want to accept and exit ?");
  for (let i = 0; i < totalUploadImg.length; i++) {
    listImg.push(totalUploadImg[i].childNodes[0].title);
  }
  if (check) {
    checkListSwitch();
    checkListConnect();
    checkListLed();
    if (listSwitchPd.length == 0) {
      alert("Please enter quantity for product !");
    } else if (inputNamePd.value == null) {
      alert("Please enter name for product !");
    } else if (checkName) {
      alert("Name product have been availabled ! Please enter name for product again.");
    } else if (inputPricePd.value == null || inputPricePd.value < inputPricePd.min) {
      alert("Please enter price for product (price >= 1) !");
    } else if (listSwitch.length == 0 || listConnect.length == 0 || listLed.length == 0) {
      alert("Please choose categories for product (Switch, Connect and LED) !");
    } else if (pdBrand.value == null) {
      alert("Please enter product brand !");
    } else if (listImg.length == 0) {
      alert("Please upload images for product !");
    } else if (listQtyPd.length == 0) {
      alert("Please enter quantity for product !");
    } else {
      let tmpId = listProduct.sort((a,b) => {
        return (a-b)/Math.abs(a-b)
      })[listProduct.length - 1].id + 1
      listProduct.push({
        id: tmpId,
        name: inputNamePd.value,
        price: inputPricePd.value,
        brand: pdBrand.value,
        wires: listConnect,
        switches: listSwitch,
        led: listLed,
        quantity: listQtyPd,
        img: listImg,
      });
      localStorage.setItem("keyboards",JSON.stringify(listProduct));
      console.log(listProduct);
      allFrame.classList.add("huy-close-all-frame");
      document.querySelector(".huy-container-info-pd").classList.remove("huy-container-info-pd-on");
    }
  }
}