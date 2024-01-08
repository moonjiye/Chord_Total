
import { ItemCnt, Cnt, CntBtn } from "../../style/Product/Product-ItemCount"

// 상품 수량
const ProductItemCnt = ({ count, onCountChange }) => {
    
    // 버튼 클릭시 카운트 up/down
    // const [count, setCount] = useState(1);
    // useState로 내부 상태를 관리하는 대신, 부모 컴포넌트에서 전달받은 count를 직접 사용합니다.


    const onIncrease = () => {
        const newCount = count + 1;
        onCountChange(newCount);
    };

    const onDecrease = () => {
        if (count > 1) {
            const newCount = count - 1;
            onCountChange(newCount);
        }
    };

    return (
        <>
            <ItemCnt>
                <CntBtn onClick={onDecrease}> - </CntBtn> 
                <Cnt>{count}</Cnt>
                <CntBtn onClick={onIncrease}> + </CntBtn>
            </ItemCnt>
        </>
    );
};

export default ProductItemCnt;