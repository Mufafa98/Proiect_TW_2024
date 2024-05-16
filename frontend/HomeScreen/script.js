function insertInformationalTextIntroduction(){
    document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>Introduction:</subtitlu><br><br>Structured Query Language (SQL) refers to a standard programming language utilized to extract, organize, manage, and manipulate data stored in relational databases. SQL is thereby referred to as a database language that can execute activities on databases that consist of tables made up of rows and columns. SQL plays a crucial role in retrieving relevant data from databases, which can later be used by various platforms such as Python or R for analysis purposes. SQL can manage several data transactions simultaneously where large volumes of data are written concurrently. SQL is an American National Standards Institute (ANSI) standard that operates via multiple versions and frameworks to handle backend data across various web applications supported by relational databases such as MySQL, SQL Server, Oracle PostgreSQL, and others. Top companies owned by Meta Inc., such as Facebook, WhatsApp, and Instagram, all rely on SQL for data processing and backend storage.";
}

function insertInformationalTextSelect(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>SELECT:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>SELECT:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>SELECT:</subtitlu><br><br>The SELECT command in SQL is used to retrieve data from one or more tables in a database. This command allows specifying the columns or expressions to include in the result set. The basic syntax involves specifying the column names from which we want to retrieve data, followed by the keyword FROM and the table name from which to select the data. This command can be used to obtain precise information from the database, and the results can be further filtered, sorted, or grouped using other clauses such as WHERE, ORDER BY, GROUP BY, and HAVING.";
    }
}

function insertTextWhere(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>WHERE:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>WHERE:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>WHERE:</subtitlu><br><br>The WHERE clause in SQL is used to filter rows from a table based on a specified condition. This condition can be a logical expression or a comparison between values, and the rows that meet the condition are included in the result set returned by the query. The basic syntax involves specifying the condition within the WHERE clause, which comes after the SELECT statement. This clause allows users to extract only the data that is relevant or meets specific criteria, making it a powerful tool for manipulating data in relational databases."; 
    }
}

function insertTextOrderBy(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>ORDER BY:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>ORDER BY:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>ORDER BY:</subtitlu><br><br>The ORDER BY clause in SQL is utilized to sort the results of a query in a specified order. This clause enables arranging the resulting rows based on the values in one or more columns of the table. The basic syntax involves specifying the columns by which sorting is desired, followed by the keywords ASC (ascending) or DESC (descending), indicating the sorting direction. Sorting is applied in the order specified in the ORDER BY clause, and the resulting rows are returned in that order. The ORDER BY clause is frequently used to organize and present data in a structured and easily understandable manner."
    }
}

function insertTextHaving(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>HAVING:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>HAVING:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>HAVING:</subtitlu><br><br> The HAVING clause in SQL is employed to filter groups of rows returned by a GROUP BY clause based on a specified condition. This condition can involve aggregate functions and is applied after the grouping operation. The basic syntax involves specifying the condition within the HAVING clause, which comes after the GROUP BY clause. This clause allows users to further refine the grouped data by applying conditions to the aggregated values, effectively filtering the groups that meet specific criteria. The HAVING clause is particularly useful for performing conditional filtering on grouped data, providing flexibility in data analysis and reporting."
    }
}

function insertTextInsertInto(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>INSERT INTO:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>INSERT INTO:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>INSERT INTO:</subtitlu><br><br>The INSERT INTO statement in SQL is used to add new rows of data into a table. This statement allows specifying the table name and the values to be inserted into each column. The basic syntax involves providing the name of the table followed by a list of column names (optional) and the corresponding values to be inserted into those columns. If column names are omitted, values must be provided for all columns in the order they appear in the table's schema. This statement enables the addition of data into the database tables, facilitating the creation and modification of records within the database."
    }
}

function insertTextUpdate(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>UPDATE:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>UPDATE:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>UPDATE:</subtitlu><br><br>The UPDATE statement in SQL is utilized to modify existing records in a table. This statement allows specifying the table name, the columns to be updated, and the new values for those columns based on a specified condition. The basic syntax involves providing the name of the table followed by the keyword SET, which is then followed by a list of column names and their corresponding new values. Additionally, a WHERE clause can be included to specify the condition that determines which rows will be updated. This statement enables the modification of data within the database, providing the capability to update specific records based on defined criteria."
    }
}

function insertTextDelete(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>DELETE:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>DELETE:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>DELETE:</subtitlu><br><br>The DELETE statement in SQL is used to remove one or more rows from a table based on a specified condition. This statement allows specifying the table name and an optional WHERE clause to indicate the condition that determines which rows will be deleted. The basic syntax involves providing the name of the table followed by the keyword DELETE FROM, and optionally, a WHERE clause specifying the condition. If no WHERE clause is provided, all rows in the table will be deleted. This statement enables the removal of data from the database tables, facilitating the management and maintenance of records within the database."
    }
}

function insertTextJoin(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>JOIN:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>JOIN:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>JOIN:</subtitlu><br><br>The JOIN operation in SQL is used to combine rows from two or more tables based on a related column between them. This operation allows retrieving data from multiple tables in a single query, facilitating the correlation of information across different tables. The basic syntax involves specifying the tables to be joined and the columns on which the join operation should be performed. Common types of joins include INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN, each specifying different behaviors for combining the rows from the participating tables. The JOIN operation enables the retrieval of related data from different tables, allowing for more complex and comprehensive data queries and analysis within the database.<br><br>The main difference between a LEFT JOIN and a RIGHT JOIN lies in which table's data is preserved in the result set. <br> In a LEFT JOIN, all records from the left table (the first table specified) are included in the result set, regardless of whether there is a matching record in the right table. If there is no matching record in the right table, NULL values are returned for the columns from the right table. <br> In contrast, in a RIGHT JOIN, all records from the right table (the second table specified) are included in the result set, regardless of whether there is a matching record in the left table. If there is no matching record in the left table, NULL values are returned for the columns from the left table.<br> Essentially, while a LEFT JOIN ensures that all records from the left table are retained, a RIGHT JOIN ensures that all records from the right table are retained. The choice between these two types of joins depends on which table's data is more crucial to the query's purpose."
    }
}

function insertTextUnion(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>UNION:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>UNION:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>UNION:</subtitlu><br><br>The UNION operator in SQL is employed to merge the result sets of two or more SELECT queries into a single result set. This operator enables the combination of rows from different queries, removing duplicates, and presenting the merged results as a unified result set. The basic syntax involves writing each SELECT statement separately, followed by the UNION keyword to concatenate them. The columns selected in each query must align in number and data type, although they do not necessarily need to have the same column names. By default, UNION eliminates duplicate rows from the final result set, while UNION ALL retains all rows, including duplicates. UNION is widely used for integrating data from various sources or applying consistent filters across multiple tables, making it a valuable tool for complex data manipulation and analysis in SQL queries."
    }
}

function insertTextCount(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>COUNT:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>COUNT:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>COUNT:</subtitlu><br><br>The COUNT function in SQL is utilized to determine the number of rows that meet a specified condition in a table. This function can be used with or without a condition, depending on whether you want to count all rows or only those that satisfy certain criteria. The basic syntax involves specifying the COUNT function followed by an expression inside parentheses, which can be either an asterisk (*) to count all rows or a column name to count the number of non-null values in that column. Additionally, a WHERE clause can be included to specify a condition for counting only the rows that meet certain criteria. The COUNT function is commonly used for statistical analysis and reporting purposes, providing valuable insights into the size and distribution of data within a database table."
    }
}

function insertTextSum(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>SUM:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>SUM:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>SUM:</subtitlu><br><br>The SUM function in SQL is used to calculate the total sum of numeric values in a specific column or expression. This function adds up all the values in the specified column and returns the result. The basic syntax involves specifying the SUM function followed by the column name or expression inside parentheses. This function is particularly useful for performing calculations on numeric data stored in database tables, such as calculating total sales, total revenue, or other aggregated values. Additionally, you can use the SUM function in combination with the GROUP BY clause to calculate sums for each group of rows based on a specific column. The SUM function is an essential tool for data analysis and reporting in SQL queries, providing valuable insights into the aggregated values within a dataset."
    }
}

function insertTextAverage(){
    if(document.getElementsByClassName("information")[0].innerHTML == "<subtitlu>AVG:</subtitlu><br>"){
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>AVG:</subtitlu><br>";
    } else {
        document.getElementsByClassName("information")[0].innerHTML = "<subtitlu>AVG:</subtitlu><br><br>The AVG function in SQL is utilized to calculate the average (mean) value of numeric data in a specific column or expression. This function computes the arithmetic mean of all the values in the specified column, returning the result. The basic syntax involves specifying the AVG function followed by the column name or expression inside parentheses. This function is commonly used for statistical analysis and reporting purposes, providing insights into the average value of a dataset, such as average sales, average ratings, or other aggregated values. Similar to the SUM function, you can also use the AVG function in combination with the GROUP BY clause to calculate averages for each group of rows based on a specific column. Overall, the AVG function is a fundamental tool for analyzing and understanding the distribution of numeric data within a database table"
    }
}