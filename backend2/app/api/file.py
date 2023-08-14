import pandas as pd
from pydantic import BaseModel  # pylint: disable=no-name-in-module


class CostCSVFile(BaseModel):
    """
    The `CostCSVFile` class is a `BaseModel` with two attributes `time` and `capacity`,
    both of which are lists of integers.
    """

    time_capacities: list[tuple[int, int]]

    def get_df(self) -> pd.DataFrame:
        """
        This function returns a pandas DataFrame with two columns, `time` and `capacity`, based on
        the attributes of the `CostCSVFile` class.

        :return: a pandas DataFrame with two columns, `time` and `capacity`
        """
        return pd.DataFrame(
            {
                "time": [x[0] for x in self.time_capacities],
                "capacity": [x[1] for x in self.time_capacities],
            }
        )


class ErrorCSVFieldsTest(BaseModel):
    job_name: str
    started_time: str


class ErrorCSVFieldsTrain(ErrorCSVFieldsTest):
    run_state: bool


class ErrorCSVFile(BaseModel):
    data: list
    train: bool

    def get_df(self) -> pd.DataFrame:
        df_data = pd.DataFrame([x.dict() for x in self.data])
        df_data["started_time"] = self.data_time(df_data["started_time"], "%Y-%m-%d %H")
        return self.data_by_name(df_data)

    def data_time(self, col: pd.Series, time: str) -> pd.Series:
        return (
            pd.to_datetime(col)
            .map(lambda x: x.strftime(time))
            .dropna()
            .drop_duplicates()
        )

    def data_by_name(
        self,
        data: pd.DataFrame,
        time_column="started_time",
        name_column="job_name",
        target="run_state",
    ):
        if not self.train:
            data[target] = 0
        data_names = (
            data.pivot_table(
                index=time_column,
                columns=name_column,
                values=name_column,
                aggfunc="count",
                fill_value=0,
            )
            .astype(int)
            .apply(lambda x: x / x.max(), axis=0)
        )
        if self.train:
            target_grouped = data.groupby([time_column])[target]
            target_column = target_grouped.apply(lambda x: x.any()).astype(int)
            data_names[target] = target_column
        return data_names.reset_index().drop(time_column, axis=1).drop_duplicates()


class ErrorCSVFileTrain(ErrorCSVFile):
    data: list[ErrorCSVFieldsTrain]
    train = True


class ErrorCSVFileTest(ErrorCSVFile):
    data: list[ErrorCSVFieldsTest]
    train = False


class ErrorCSVModel(ErrorCSVFileTest):
    model: str
