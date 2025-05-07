$(document).ready(function () {
  // Đọc File dữ liệu
  Papa.parse("../data/thongTinSanPham.csv", {
    download: true,
    header: true,
    complete: function (results) {
      console.log(results.data); // Kết quả đọc được
    },
  });

  let kh = JSON.parse(sessionStorage.getItem("KH")) || null;

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

  // Khi click nút "Đặt hàng"
  $(document).on("click", ".btnDatHang", function (e) {
    e.stopPropagation();
    e.preventDefault();

    if (!kh) {
      alert("Vui lòng đăng nhập để đặt hàng!");
      return;
    }

    const id = $(this).data("id");
    const vatpham = { id: id, soLuong: 1 };
    let gioHang = JSON.parse(sessionStorage.getItem("gioHang")) || [];

    let index = gioHang.findIndex((item) => item.id === id);
    if (index === -1) {
      gioHang.push(vatpham);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } else {
      alert("Đã có sản phẩm trong giỏ hàng!");
    }

    sessionStorage.setItem("gioHang", JSON.stringify(gioHang));
  });

  // Xem thông tin sản phẩm
  $(document).on("click", ".btnXemThongTin", function (e) {
    e.preventDefault();
    const id = $(this).closest(".dathang").data("id");
    sessionStorage.setItem("idChiTiet", id);
    window.location.href = "./XemThongTin.html";
  });

  // Hiển thị nút đăng nhập / đăng xuất
  if (!kh) {
    $("#khoiDN").html(`
      <a href="./DangNhap.html" class="btn btn-danger text-white">Đăng nhập</a>
    `);
  } else {
    $("#khoiDN").html(
      '<button class="btn btn-primary p-2 text-white dangXuat">Đăng xuất</button>'
    );
  }
});
