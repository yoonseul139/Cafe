// jQuery panel auto slide (원래 코드 유지)
if (window.jQuery) {
  $(function () {
    setInterval(function () {
      $(".panel").animate({ "margin-left": "-100%" }, function () {
        $(".panel li:first").appendTo(".panel");
        $(".panel").css({ "margin-left": "0px" });
      });
    }, 3000);
  });
}

/* ------------------------------------------
카테고리별 메뉴 데이터
-------------------------------------------*/
const data = {
  coffee: [
    { img: "img/menu_coffee1.jpg", name: "스페니쉬 연유 라떼" },
    { img: "img/menu_coffee2.jpg", name: "롱블랙" },
    { img: "img/menu_coffee3.jpg", name: "TWG 1837 블랙티" },
    { img: "img/menu_coffee4.jpg", name: "스트로베리 피치 프라페" },
  ],

  dessert: [
    { img: "img/menu_dessert1.jpg", name: "스트로베리 초콜릿 생크림" },
    { img: "img/menu_dessert2.jpg", name: "마스카포네 티라미수초코 타르트" },
    { img: "img/menu_dessert3.jpg", name: "레드벨벳" },
    { img: "img/menu_dessert4.jpg", name: "뉴욕 치즈 케이크" },
    { img: "img/menu_dessert5.jpg", name: "아이스 박스" },
  ],

  deli: [
    { img: "img/menu_deli1.jpg", name: "호밀 B. E. L. T" },
    { img: "img/menu_deli2.jpg", name: "페스토 햄치즈 파니니" },
    { img: "img/menu_deli3.jpg", name: "그릴드 치킨 샐러드" },
    { img: "img/menu_deli4.jpg", name: "코코넛 카야 크루아상" },
    { img: "img/menu_deli5.jpg", name: "에그 샐러드번" },
  ],
};

/* ------------------------------------------
기본값: DELI 카테고리로 시작
-------------------------------------------*/
let items = [...data.deli];

/* ------------------------------------------
초기화 함수
-------------------------------------------*/
function init() {
  // DOM 요소 가져오기
  const big = document.querySelector(".right .one");
  const thumbs = document.querySelectorAll(".right li:not(.one)");
  const nameBox = document.querySelector(".right .txt p");
  const leftBtn = document.querySelector(".btn-left");
  const rightBtn = document.querySelector(".btn-right");

  if (!big || thumbs.length === 0 || !nameBox) {
    console.warn("필요한 요소를 찾을 수 없습니다.");
    return;
  }

  /* ------------------------------------------
  update(): 현재 items 배열을 화면에 반영한다
  -------------------------------------------*/
  function update() {
    // ★ 큰 이미지
    big.style.backgroundImage = `url(${items[0].img})`;
    nameBox.textContent = items[0].name;

    // ★ 썸네일 이미지들 (2~5번째)
    thumbs.forEach((el, i) => {
      const item = items[i + 1];
      if (item) {
        el.style.backgroundImage = `url(${item.img})`;
        el.dataset.name = item.name;
      } else {
        el.style.backgroundImage = "";
        delete el.dataset.name;
      }
    });
  }

  /* ------------------------------------------
   좌우 버튼 슬라이드
  -------------------------------------------*/
  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      items.unshift(items.pop());
      update();
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      items.push(items.shift());
      update();
    });
  }

  /* ------------------------------------------
   썸네일 클릭 → 해당 이미지 앞으로 이동
  -------------------------------------------*/
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      const targetIndex = i + 1;
      const target = items[targetIndex];
      if (!target) return;

      // 즉시 보여주기
      big.style.backgroundImage = `url(${target.img})`;
      nameBox.textContent = target.name;

      // 배열 재배치 (선택한 이미지 앞으로)
      const selected = items.splice(targetIndex, 1)[0];
      items.unshift(selected);

      update();
    });
  });

  /* ------------------------------------------
    카테고리 클릭 이벤트 (가장 중요!)
  -------------------------------------------*/
  document.querySelectorAll(".left ul li a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      // ✔ 모든 카테고리에서 active 제거
      document.querySelectorAll(".left ul li a").forEach((a) => {
        a.classList.remove("active");
      });

      // ✔ 클릭한 카테고리만 active 추가
      el.classList.add("active");
      const text = el.textContent.trim();

      if (text === "COFFEE STORY") {
        items = [...data.coffee];
      } else if (text === "DESSERT STORY") {
        items = [...data.dessert];
      } else if (text === "DELI STORY") {
        items = [...data.deli];
      }

      update();
    });
  });

  // 초기 1회 실행
  update();
}

/* ------------------------------------------
   DOM 로드 후 init
-------------------------------------------*/
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
