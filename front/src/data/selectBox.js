import $ from 'jquery';

export function selectBOX() { // 진료과 selectBOX 생성함수
    let departments = ["진료과 선택", "내과", "외과", "정형외과", "산부인과", "피부과", "이비인후과", "치과", "신경외과", "소아과", "안과", "비뇨기과", "정신건강의학과", "가정의학과"];

    // 진료과 선택 박스 초기화
    $("#department").each(function() {
        let $department = $(this);

        // 기존 옵션 초기화
        $department.empty();

        // 새로운 옵션 추가
        $.each(departments, function(_, department) {
            $department.append(`<option value='${department}'>${department}</option>`);
        });
    });
}
