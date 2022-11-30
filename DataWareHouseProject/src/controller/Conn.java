package controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import javax.swing.table.DefaultTableModel;

import module.Data;

public class Conn {
	private Statement statement;
	private ResultSet rs;
	private Connection connection = null;

//	public ResultSet connectMySQL(String query) {
//		try {
//			Class.forName("com.mysql.cj.jdbc.Driver");
//			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/datawarehouse", "root", "");
//
//			statement = connection.createStatement();
//			resultSet = statement.executeQuery(query);
//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}
//		return resultSet;
//	}
//	public List<Data> connectMySQL() {
//		int id;
//		String naKey, date, province, prize8, prize7, prize6, prize5, prize4, prize3, prize2, prize1, prizeDB,
//		expiredDate;
//		int isDelete;
//		List<Data> list = new ArrayList<>();
//		try {
//			Class.forName("com.mysql.cj.jdbc.Driver");
//			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/datawarehouse", "root", "");
//			
//			statement = connection.createStatement();
//			resultSet = statement.executeQuery("select * from result");
//			Data tmp;
//			while (resultSet.next()) {
//				id = resultSet.getInt(1);
//				naKey = resultSet.getString(2);
//				province = resultSet.getString(3);
//				date = resultSet.getString(4);
//				prize8 = resultSet.getString(5);
//				prize7 = resultSet.getString(6);
//				prize6 = resultSet.getString(7);
//				prize5 = resultSet.getString(8);
//				prize4 = resultSet.getString(9);
//				prize3 = resultSet.getString(10);
//				prize2 = resultSet.getString(11);
//				prize1 = resultSet.getString(12);
//				prizeDB = resultSet.getString(13);
//				expiredDate = resultSet.getString(14);
//				isDelete = resultSet.getInt(15);
//				tmp = new Data(id, naKey, province, date, prize8, prize7, prize6, prize5, prize4, prize3, prize2,
//						prize1, prizeDB, expiredDate, isDelete);
//			}
//			resultSet.close();
//			statement.close();
//			connection.close();
//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}
//		return list;
//	}
	public DefaultTableModel buildTableModel(String query)
	        throws SQLException {
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/datawarehouse", "root", "");

			statement = connection.createStatement();
			rs = statement.executeQuery(query);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	    ResultSetMetaData metaData = rs.getMetaData();

	    // names of columns
	    Vector<String> columnNames = new Vector<String>();
	    int columnCount = metaData.getColumnCount();
	    for (int column = 1; column <= columnCount; column++) {
	        columnNames.add(metaData.getColumnName(column));
	    }

	    // data of the table
	    Vector<Vector<Object>> data = new Vector<Vector<Object>>();
	    while (rs.next()) {
	        Vector<Object> vector = new Vector<Object>();
	        for (int columnIndex = 1; columnIndex <= columnCount; columnIndex++) {
	            vector.add(rs.getObject(columnIndex));
	        }
	        data.add(vector);
	    }
	    rs.close();
	    statement.close();
	    connection.close();
	    return new DefaultTableModel(data, columnNames);

	}

//	public static void main(String[] args) {
//		Conn c = new Conn();
//		c.connectMySQL();
//		for(Data o: c.connectMySQL()) {
//			System.out.println(o.toString());
//		}
//	}

}
