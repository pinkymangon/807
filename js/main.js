const PROXY_URL = 'https://script.google.com/macros/s/AKfycbwNDpz838sV5DUzZPDmvRLO9tEEIHpkLnX1nfCPHv-gAx1rQ2orw20r3-4HxUnR52IMBQ/exec';
const $formDisablepic = document.getElementById('formDisablePic');
window.addEventListener("DOMContentLoaded", (event) => {

  // Navbar shrink function
  const navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

});

async function fetchImages() {
    try {
      const response = await fetch(PROXY_URL + '?action=getImages');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // 檢查返回的內容是否是 JSON
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        // log
        const textResponse = await response.text();
        console.error('Expected JSON, but got:', textResponse);
        throw new Error('Expected JSON, but got something else');
      }
  
      // 解析 JSON
      const responseJson = await response.json();
  
      if (responseJson.adpic) {
        const adpic = responseJson.adpic;
        var $adPic = document.getElementById('adPic');
  
        $adPic.src = adpic;
  
        if (responseJson.adlink) {
          var adLink = $adPic.parentElement;
          adLink.href = responseJson.adlink;
        }
  
        // 檢查本地儲存中是否存在“今日不再顯示”的標誌
        var dontShowToday = localStorage.getItem('dontShowToday');
        var today = new Date().toISOString().split('T')[0]; // 獲取今日日期字串
  
        if (dontShowToday !== today) {
          var adModal = new bootstrap.Modal(document.getElementById('adModal'));
          adModal.show();
        }
  
        document.getElementById('dontShowToday').addEventListener('change', function () {
          if (this.checked) {
            // 設置“今日不再顯示”的標誌
            localStorage.setItem('dontShowToday', today);
          } else {
            localStorage.removeItem('dontShowToday');
          }
        });
      }
  
      // 圖片庫生成
      const picTemplateHtml = (href, title, name) => `
              <div class="col-lg-4 col-sm-6">
                <a class="portfolio-box" href="${href}" title="${name}">
                  <img class="img-fluid" src="${href}" alt="..." />
                  <div class="portfolio-box-caption p-3">
                    <div class="project-category text-white-50">
                      ${title}
                    </div>
                    <div class="project-name">${name}</div>
                  </div>
                </a>
              </div>
            `;
  
      if (responseJson.photos) {
        const picArr = responseJson.photos;
        // 轉換的 outHtml
        let outPicHTML = "";
        // picArr，生成每個項目的 HTML
        picArr.forEach(pic => {
          outPicHTML += picTemplateHtml(pic.href, pic.title, pic.name);
        });
  
        // 將生成的 HTML 添加到頁面中
        document.getElementById('photo_album').innerHTML = outPicHTML;
        // Activate SimpleLightbox plugin for portfolio items
        new SimpleLightbox({
          elements: "#portfolio a.portfolio-box",
        });
  
      }
  
      if (responseJson.menupic) {
  
        const menupic = responseJson.menupic;
        var $menupic = document.getElementById('menupic');
        var $menulink = $menupic.querySelector('a');
        $($menupic).removeClass('d-none');
        var $menuImg = $menupic.querySelector('img');
  
        $menuImg.src = menupic;
  
        if (responseJson.menulink) {
  
          $menulink.href = responseJson.menulink;
        }
  
        new SimpleLightbox({
          elements: "#menupic a.portfolio-box",
        });
      }

      if (responseJson.menuGiftpic) {
  
        const menuGiftpic = responseJson.menuGiftpic;
        var $menuGiftpic = document.getElementById('menuGiftpic');
        var $menuGiftlink = $menuGiftpic.querySelector('a');
        $($menuGiftpic).removeClass('d-none');
        var $menuGiftImg = $menuGiftpic.querySelector('img');
  
        $menuGiftImg.src = menuGiftpic;
  
        if (responseJson.menuGiftlink) {
  
          $menuGiftlink.href = responseJson.menuGiftlink;
        }
  
        new SimpleLightbox({
          elements: "#menuGiftpic a.portfolio-box",
        });
      }
  

      if (responseJson.bonuspic) {
  
        const bonuspic = responseJson.bonuspic;
        var $bonuspic = document.getElementById('bonus');
        var $bonuslink = $bonuspic.querySelector('a');
        $($bonuspic).removeClass('d-none');
        var $bonusImg = $bonuspic.querySelector('img');
  
        $bonusImg.src = bonuspic;
  
        if (responseJson.bonuslink) {
  
          $bonuslink.href = responseJson.bonuslink;
        }
  
        new SimpleLightbox({
          elements: "#bonus a.portfolio-box",
        });
      }
  
      if (responseJson.formDisablepic) {
  
        const formDisablepic = responseJson.formDisablepic;
  
        var $formDisablelink = $formDisablepic.querySelector('a');
        var $formDisableImg = $formDisablepic.querySelector('img');
  
        $formDisableImg.src = formDisablepic;
  
        if (responseJson.formDisablelink) {
  
          $formDisablelink.href = responseJson.formDisablelink;
        }
  
        new SimpleLightbox({
          elements: "#formDisablePic a.portfolio-box",
        });
      }
  
    } catch (error) {
      console.error('Error fetching rounds:', error);
    }
  
  }
  

document.addEventListener('DOMContentLoaded', fetchRounds);
document.addEventListener('DOMContentLoaded', fetchImages);


async function fetchRounds() {
  try {
    const response = await fetch(PROXY_URL + '?action=getRounds');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 檢查返回的內容是否是 JSON
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      
      const textResponse = await response.text();
      console.error('Expected JSON, but got:', textResponse);
      throw new Error('Expected JSON, but got something else');
    }

    // 解析 JSON
    const responseJson = await response.json();
    const formEnable = responseJson.formEnable;
    const formDisableMsg = responseJson.formDisableMsg;

    // 表單未啟用
    if (!formEnable) {
      $('#apply-subtitle').html(formDisableMsg).removeClass('d-none');
      $($formDisablepic).removeClass('d-none');

    } else {

      $($formDisablepic).addClass('d-none');
      $('form').removeClass('d-none');
      $('#apply-subtitle').removeClass('d-none');

      const rounds = responseJson.options;
      const roundSelect = document.getElementById('round');
      // 清空之前的選項
      roundSelect.innerHTML = '';

      // 將獲取到的數據添加到選單中
      rounds.forEach((round, index) => {
        const option = document.createElement('option');
        option.value = round.round;
        option.text = round.round;
        option.setAttribute('data-max', round.limit);
        roundSelect.appendChild(option);
        // 設置 count 的最大值為第一個選項的 data-max
        if (roundSelect.options.length > 0) {
          const firstOption = roundSelect.options[0];
          const max = firstOption.getAttribute('data-max');
          const countInput = document.getElementById('count');
          countInput.max = max;
        }

      });

      $('#round').prop('selectedIndex', 0).trigger('change');
      $('#count').attr('max', $('#round option:selected').data('max'));
    }

    $('.spinner-load').addClass("d-none");

  } catch (error) {
    console.error('Error fetching rounds:', error);
  }
  
}

document.addEventListener('DOMContentLoaded', fetchRounds);

// 監聽下拉選單的 change 事件
document.getElementById('round').addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  const max = selectedOption.getAttribute('data-max');
  const countInput = document.getElementById('count');

  countInput.value = ''; // 清空輸入框
  countInput.max = max; // 設置最大值
});
  
document.getElementById("applyForm").addEventListener("submit", async function (event) {

  event.preventDefault(); // 阻止默認表單提交行為

  var form = this;

  form.classList.remove('was-validated');

  const formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });


  // 自定義驗證
  const mangonCount = parseInt(form.mangon_count.value) || 0;
  const pinkyCount = parseInt(form.pinky_count.value) || 0;
  const count = parseInt(form.count.value) || 0;
  const phone = form.phone.value || '';
  const countMax = $('#count').attr('data-max');

  if (mangonCount + pinkyCount < count) {
    form.mangon_count.setCustomValidity('餐點數量總和不能小於預約人數(${count})');
    form.pinky_count.setCustomValidity('餐點數量總和不能小於預約人數(${count})');
  } else {
    form.mangon_count.setCustomValidity(''); // 清除錯誤消息
    form.pinky_count.setCustomValidity(''); // 清除錯誤消息
  }
  

  if (count > 2 && form.message.value == "") {
    form.message.setCustomValidity('超過兩人以上麻煩填寫第二人聯絡方式');
  }
  else {
    form.message.setCustomValidity(''); // 清除錯誤消息
  }

  if (!phone.match(/^[0-9]{10}$/)) {
    form.phone.setCustomValidity('請輸入有效的手機號碼');
  } else {
    form.phone.setCustomValidity(''); // 清除錯誤消息
  }

  // 檢查表單是否有效
  if (form.checkValidity() === false) {
    event.stopPropagation();
    form.classList.add('was-validated'); // 添加驗證狀態已顯示驗證訊息
    return;  
  }

  if (confirm('確認要送出?')) {
    var $submitButton = $('#submitButton');
    $submitButton.prop('disabled', true);


    setMsgModalShow("loading");

    // 將表單數據轉換為 JSON
    const jsonData = JSON.stringify(formObject);

    try {
      // POST 
      const response = await fetch(PROXY_URL, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: jsonData,
      });

      // 處理響應
      const resData = await response.json();
      if (resData.result == 'ok') {
        let $success = $('#submitSuccessMessage');
        $success.find('.successMessage').html(resData.message);
        $success.removeClass("d-none");
        setMsgModalShow('success', $('#submitSuccessMessage').html());
        //lock
        Array.from(this.elements).forEach(element => element.disabled = true);
        document.getElementById('submitButton').remove();

      }
      else {
        setMsgModalShow('error', resData.message)

        if (resData.status == '19') {
          $('form').addClass('d-none');
          $('#apply-subtitle').html(resData.message).removeClass('d-none');
          $($formDisablepic).removeClass('d-none');
        }

        if (resData.status == '09') {
          // 超額更新下拉選項
          fetchRounds();
        }
        $submitButton.removeClass('loading');
        $submitButton.prop('disabled', false);
      }
    } catch (error) {
      console.log('Error submitting the form:', error);
      alert("提交表單時發生錯誤");
      $submitButton.removeClass('loading');
      $submitButton.prop('disabled', false);
      $('#msgModal').modal('hide');
    }

  }
  else {
    $submitButton.removeClass('loading');
    $submitButton.prop('disabled', false);
    return;
  }
  
});



function setMsgModalShow(type, msg) {

  let picName = "";
  let okBtn = true;

  switch (type) {
    case "success":
      picName = "gonxi.gif";

      break;
    case "error":
      picName = "wow.gif";
      break;
    case "loading":
      okBtn = false;
      picName = "loading.gif";
      msg = "表單送出中...<br>請勿離開頁面，耐心等候！";
      break;
  }
  document.getElementById('msgPic').src = "images/" + picName;
  $('#msgModal #msg-text').html(msg);
  if (okBtn) {
    $('#msgModal .modal-footer').show();
  }
  else {
    $('#msgModal .modal-footer').hide();
  }
  $('#msgModal').modal('show');
}
$('#msgModal button.ok').on('click', () => {
  $('#msgModal').modal('hide'); 
});

function reloadPage() {
  // 使用 location.replace 重載頁面不带 # 符号
  window.location.replace(window.location.href.split('#')[0]);
}

console.log(
  "%c-------------- 我很努力生出網站，請勿GON擊我 --------------\n" +
  "%c ___  _  _ _  _ __ _ _   __ __            ___   ___  _ _ \n" +
  "%c| . \\| || \\ || / /| | | |  \\  \\ ___ ._ _ /  _> | . || \\ |\n" +
  "%c|  _/| ||   ||  \\ \\   / |     |<_> || ' || <_/\\| | ||   |\n" +
  "%c|_|  |_||_\\_||_\\_\\ |_|  |_|_|_|<___||_|_|`____/`___'|_\\_|\n\n" +
  "%c --------- ⓒ EEEEE TEAM - KOOKni | IN TAIWAN | ---------\n"
  , "color:#d87199", "color:#d87199", "color:#d87199", "color:#e7a6c1", "color:#e7a6c1", "color:#d87199"
);
