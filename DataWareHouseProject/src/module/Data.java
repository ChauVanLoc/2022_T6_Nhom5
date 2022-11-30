package module;

public class Data {
	private int id;
	private String naKey;
	private String province;
	private String date;
	private String prize8;
	private String prize7;
	private String prize6;
	private String prize5;
	private String prize4;
	private String prize3;
	private String prize2;
	private String prize1;
	private String prizeDB;
	private String expiredDate;
	private int isDelete;

	public Data(int id, String naKey, String province, String date, String prize8, String prize7, String prize6,
			String prize5, String prize4, String prize3, String prize2, String prize1, String prizeDB,
			String expiredDate, int isDelete) {
		this.id = id;
		this.naKey = naKey;
		this.province = province;
		this.date = date;
		this.prize8 = prize8;
		this.prize7 = prize7;
		this.prize6 = prize6;
		this.prize5 = prize5;
		this.prize4 = prize4;
		this.prize3 = prize3;
		this.prize2 = prize2;
		this.prize1 = prize1;
		this.prizeDB = prizeDB;
		this.expiredDate = expiredDate;
		this.isDelete = isDelete;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNaKey() {
		return naKey;
	}

	public void setNaKey(String naKey) {
		this.naKey = naKey;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getPrize8() {
		return prize8;
	}

	public void setPrize8(String prize8) {
		this.prize8 = prize8;
	}

	public String getPrize7() {
		return prize7;
	}

	public void setPrize7(String prize7) {
		this.prize7 = prize7;
	}

	public String getPrize6() {
		return prize6;
	}

	public void setPrize6(String prize6) {
		this.prize6 = prize6;
	}

	public String getPrize5() {
		return prize5;
	}

	public void setPrize5(String prize5) {
		this.prize5 = prize5;
	}

	public String getPrize4() {
		return prize4;
	}

	public void setPrize4(String prize4) {
		this.prize4 = prize4;
	}

	public String getPrize3() {
		return prize3;
	}

	public void setPrize3(String prize3) {
		this.prize3 = prize3;
	}

	public String getPrize2() {
		return prize2;
	}

	public void setPrize2(String prize2) {
		this.prize2 = prize2;
	}

	public String getPrize1() {
		return prize1;
	}

	public void setPrize1(String prize1) {
		this.prize1 = prize1;
	}

	public String getPrizeDB() {
		return prizeDB;
	}

	public void setPrizeDB(String prizeDB) {
		this.prizeDB = prizeDB;
	}

	public String getExpiredDate() {
		return expiredDate;
	}

	public void setExpiredDate(String expiredDate) {
		this.expiredDate = expiredDate;
	}

	public int getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return id + " - " + naKey + " - " + province + " - " + date + " - " + prize8 + " - " + prize7 + " - " + prize6 ;
	}
}
