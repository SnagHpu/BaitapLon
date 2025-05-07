$(document).ready(function () {
  //Đọc File dữ liệu
  Papa.parse("../data/thongTinSanPham.csv", {
    download: true,
    header: true,
    complete: function (results) {
      console.log(results.data); // Kết quả đọc được
    },
  });

  let kh = JSON.parse(sessionStorage.getItem("KH")) || [];
  //Hành động
  // Hover để hiện nút Đặt hàng và Xem thông tin
  $(document).on("mouseenter", ".dathang", function () {
    const id = $(this).data("id");
    $(this).find(".datHang").html(`
      <button class="btn btn-danger col-5 me-1 btnDatHang" data-id="${id}">Đặt hàng</button>
      <button class="btn btn-info col-5 btnXemThongTin">Xem thông tin</button>
    `);
  });

  $(document).on("mouseleave", ".dathang", function () {
    $(this).find(".datHang").empty();
  });

  //Khi click nút "Đặt hàng" => Lưu id vào sessionStorage
  $(document).on("click", ".btnDatHang", function (e) {
    e.stopPropagation();
    e.preventDefault();

    // Kiểm tra đăng nhập
    const kh = JSON.parse(sessionStorage.getItem("KH"));
    if (!kh || kh.length === 0) {
      alert("Vui lòng đăng nhập để đặt hàng!");
      return;
    }

    // Lấy id sản phẩm từ chính nút
    const id = $(this).data("id");

    let gioHang = JSON.parse(sessionStorage.getItem("gioHang")) || [];

    if (!gioHang.includes(id)) {
      gioHang.push(id);
      sessionStorage.setItem("gioHang", JSON.stringify(gioHang));
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } else {
      alert("Sản phẩm đã có trong giỏ hàng!");
    }
  });
  // Nhấn nút btnXemThongTin
  $(document).on("click", ".btnXemThongTin", function (e) {
    e.preventDefault();
    const id = $(this).closest(".dathang").data("id");

    // Lưu id vào sessionStorage
    sessionStorage.setItem("idChiTiet", id);

    // Chuyển hướng sang trang chi tiết
    window.location.href = "./XemThongTin.html";
  });

  //Xóa nút đăng nhập
  if (Array.isArray(kh) && kh.length === 0) {
    $("#khoiDN").html(
      `<div id="khoiDN" class="me-1 mb-2 mb-lg-0">
            <a href="./DangNhap.html" class="btn btn-danger text-white"
              >Đăng nhập</a
            >
          </div>`
    );
  } else {
    $("#khoiDN").html(
      '<button class="btn btn-primary p-2 text-white">Đăng xuất</button>'
    );
  }
});
