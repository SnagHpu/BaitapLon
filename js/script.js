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

    const id = $(this).data("id");
    let gioHang = JSON.parse(sessionStorage.getItem("gioHang")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    let index = gioHang.findIndex((item) => item.id === id);
    if (index === -1) {
      gioHang.push({ id: id, soLuong: 1 });
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } else {
      gioHang[index].soLuong += 1;
      alert("Đã tăng số lượng sản phẩm trong giỏ hàng!");
    }

    sessionStorage.setItem("gioHang", JSON.stringify(gioHang));
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
      '<button class="btn btn-primary p-2 text-white dangXuat">Đăng xuất</button>'
    );
  }
});
