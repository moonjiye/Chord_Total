import React, { useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import {
  PayBox,
  PerformanceButton,
  RadioButton,
} from "../../style/MyPageStyle";
const clientKey = "test_ck_26DlbXAaV01OJX6EbLN5rqY50Q9R";
const customerKey = "test_sk_5OWRapdA8dJwzRlXG1yRVo1zEqZK";

export const PayComponent = ({ email, username, phone }) => {
  const [price, setPrice] = useState(100);

  const requestPayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      console.log(paymentWidget);
      await paymentWidget?.requestPayment({
        orderId: "p93WFPeu_ZS9--L7wNdca",
        orderName: "포인트충전",
        customerName: username,
        customerEmail: email,
        customerMobilePhone: phone,
        successUrl: `${window.location.origin}/success?username=${username}&email=${email}&phone=${phone}`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      // 에러 처리하기
      console.error(error);
    }
  };

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  useEffect(() => {
    // setParamPrice(Price);
    (async () => {
      // ------  결제위젯 초기화 ------
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제

      // ------  결제 UI 렌더링 ------
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        { value: price },
        { variantKey: "DEFAULT" }
      );

      // ------  이용약관 UI 렌더링 ------
      paymentWidget.renderAgreement(
        "#agreement",
        { variantKey: "AGREEMENT" } // 기본 이용약관 UI 렌더링
      );
      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }
    console.log(email);
    console.log(price);
    // ------ 금액 업데이트 ------
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <PayBox>
      <h1>충전하기</h1>
      <span>{`${price.toLocaleString()}원`}</span>
      <div>
        <div>
          <RadioButton
            id="1000"
            name="charge"
            value="1000"
            className={price === 1000 ? "checked" : ""}
            onClick={() => setPrice(1000)}
          >
            1,000원
          </RadioButton>
          <RadioButton
            id="5000"
            name="charge"
            value="5000"
            className={price === 5000 ? "checked" : ""}
            onClick={() => setPrice(5000)}
          >
            5,000원
          </RadioButton>
          <RadioButton
            id="10000"
            name="charge"
            value="10000"
            className={price === 10000 ? "checked" : ""}
            onClick={() => setPrice(10000)}
          >
            10,000원
          </RadioButton>
        </div>
      </div>
      <div id="payment-widget" />
      <div id="agreement" />
      <PerformanceButton onClick={requestPayment}>결제하기</PerformanceButton>
    </PayBox>
  );
};
export default PayComponent;
