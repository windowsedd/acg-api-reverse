# ACG-API-Reverse (逆向工程)

本專案是針對 ACGHK (香港動漫電玩節) 手機應用程式的逆向工程 API。您可以透過此 API 與 ACGHK 的後端服務進行互動，執行登入、瀏覽內容、管理訂單等多項操作。

## 功能特性

- **身分驗證**: 使用您的 ACGHK 帳號密碼登入。
- **內容瀏覽**: 檢視 ACGHK 應用程式中的內容。
- **訂單管理**:
  - 取得您的所有訂單列表。
  - 透過訂單 ID 查詢特定訂單的詳細資訊。
  - 建立新訂單。
- **個人資料**: 獲取您的使用者個人資料。
- **優惠券**:
  - 獲取可用的優惠券列表。
  - 查詢特定優惠券的詳細資訊。

## 如何開始

### 環境需求

- 在您的電腦上安裝 [Bun](https://bun.sh/)。
- 一個 ACGHK 帳號。

### 安裝步驟

1. 複製本專案的程式碼庫：

    ```bash
    git clone https://github.com/windowsed1225/acg-api-reverse.git
    cd acg-api-reverse
    ```

2. 安裝專案依賴：

    ```bash
    bun install
    ```

3. 在專案根目錄下建立一個 `.env` 檔案，並加入以下環境變數：

    ```
    expoPushToken=your-expo-push-token
    appCheckToken=your-app-check-token
    ```

    **注意**：您可以透過攔截 ACGHK 官方手機應用程式的網路流量來取得這些 token。

### 使用範例

您可以使用 `api.ts` 中的 `API` 類別來與 ACGHK API 進行互動。以下是一個登入並取得個人資料的範例：

```typescript
import API from './api';
import { LoginResponse } from "./types/index";
import "dotenv/config";

async function main() {
    const api = new API();

    // 登入您的帳號
   const loginResult: LoginResponse | null = await api.Login({
      email: "youremail@gmail.com",
      password: process.env.PASSWORD as string,
    });

      if (loginResult?.result === "success" && loginResult.token) {
        // [-----Get Ticket Type-----]
        // const ticketTypes: getTicketTypeResponse | null = await api.getTicketType();
        // console.log("Ticket Types:", ticketTypes);
        // [-----Get Content-----]
        // const content: getContentResponse | null = await api.viewContent();
        // console.log("Content:", content);
        // [-----Get Profile-----]
        // const profile: getProfileResponse | null = await api.getProfile();
        // console.log("Profile:", profile);
        // [-----Get Orders-----]
        // const orders: getOrderResponse | null = await api.getOrders();
        // console.log("Orders:", orders);
        // [-----Get Coupons-----]
        // const coupons: getCouponResponse | null = await api.getCoupons();
        // console.log("Coupons:", coupons);
        // [-----Get Order Detail-----]
        // const orderDetail: getOrderByIdResponse | null = await api.getOrderById({
        //  orderId: "250709144648-5d38",
        // });
        // console.log("Order Detail:", orderDetail);
         // [----- POST Order -----]
        // const payload = buildTicketPayload({
        //  ticketTypeId: "6d4b4890-dc1e-4b3c-8b83-a4f4b83aff6c",
        //  quantity: 3,
        //  dates: ["2025-07-25", "2025-07-28", "2025-07-29"],
        //  name: "[YOUR-IRL_NAME]",
        // });
        // const postMemberOrders = await API.postMemberOrders({
        //  payload,
        // });
    }
}

main();
```

## API 參考

關於更多可用的 API 方法及其參數的詳細資訊，請參閱 `api.ts` 檔案。

## 免責聲明

本專案僅供教育目的使用。作者不對任何濫用此 API 的行為負責。
