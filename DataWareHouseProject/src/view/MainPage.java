package view;

import java.awt.EventQueue;
import java.awt.SystemColor;
import java.sql.SQLException;
import java.util.List;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;

import controller.Conn;
import module.Data;
import java.awt.Font;

public class MainPage extends JFrame {

	private JPanel contentPane;
	private JTable table;
	private Conn con = new Conn();
	private Object[][] data;
	private String[] columnsName = {"Id", "NaKey", "Province", "Date", "Prize 8", "Prize 7", "Prize 6", "Prize 5",
			"Prize 4", "Prize 3", "Prize 2", "Prize 1", "Prize Special", "Expired Date", "isDelete"};

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					MainPage frame = new MainPage();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 * @throws SQLException 
	 */
	public MainPage() throws SQLException {
		setForeground(SystemColor.windowText);
		setBackground(SystemColor.activeCaption);
		setTitle("DataWarehouseProject");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 1295, 723);
		contentPane = new JPanel();
		contentPane.setBackground(SystemColor.menu);
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setLocationRelativeTo(null);

		setContentPane(contentPane);
		contentPane.setLayout(null);

		JScrollPane scrollPane = new JScrollPane();
		scrollPane.setBounds(10, 67, 1261, 609);
		contentPane.add(scrollPane);

		table = new JTable();
		table.setFont(new Font("Times New Roman", Font.PLAIN, 13));
		table.setFillsViewportHeight(true);
		table.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
		table.setAutoCreateRowSorter(true);
		table.setModel(con.buildTableModel("SELECT * FROM result"));
		scrollPane.setViewportView(table);
	}

}
