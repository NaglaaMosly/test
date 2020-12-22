export class Constants {
  static readonly LOGGED_IN_USER = 'loggedInUser';
  static readonly TOKEN = 'token';
  static readonly REFRESH_TOKEN = 'refresh-token';
  static readonly ENGLISH_LOCAL_ID = 'en';
  static readonly ARABIC_LOCAL_ID = 'ar';
  static readonly TOKEN_EXPIRED = 'TOKEN_EXPIRED';
  static readonly TOKEN_REFRESH_TIME_EXPIRED = 'TOKEN_REFRESH_TIME_EXPIRED';
  static readonly WEEK_FORMAT_LONG_NAME = 'do [of] MMMM';
  static readonly MONTH_FORMAT_LONG_NAME = 'MMMM';
  static readonly DAY_FORMAT_LONG_NAME = 'dddd';
  static readonly REDEMPTION_SMS__TEMPLATE_EN = 'Transaction on date : [(${loyaltyTransaction.transactionDate})] '
    + 'with amount : [(${loyaltyTransaction.amount})] on merchant : [(${loyaltyTransaction.partner.nameEn})]';
  static readonly REDEMPTION_SMS__TEMPLATE_AR = 'عملية جديدة فى تاريخ : [(${loyaltyTransaction.transactionDate})] '
    + 'بقيمة : [(${loyaltyTransaction.amount})] عند التاجر : [(${loyaltyTransaction.partner.nameEn})]';
  static readonly DEFAULT_PAGE_SIZE = 20;
}
