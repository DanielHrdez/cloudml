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


class ErrorCSVFields(BaseModel):
    job_name: str
    started_time: str
    execution_time: float
    run_state: bool


class ErrorCSVFile(BaseModel):
    data: list[ErrorCSVFields]

    def get_df(self) -> pd.DataFrame:
        new_data = [x.dict() for x in self.data]
        new_data_df = pd.DataFrame(new_data)
        new_data_df = self.data_time(new_data_df, "%Y-%m-%d %H")
        return self.data_by_name(new_data_df)

    def data_time(
        self, data: pd.DataFrame, time: str, column: str = "started_time"
    ) -> pd.DataFrame:
        data[column] = pd.to_datetime(data[column])
        data[column] = data[column].map(lambda x: x.strftime(time))
        return data.dropna().drop_duplicates()

    def data_by_name(
        self,
        data: pd.DataFrame,
        time_column="started_time",
        name_column="job_name",
        target="run_state",
    ):
        target_column = (
            data.groupby([time_column])[target].apply(lambda x: x.any()).astype(int)
        )
        data_names = (
            data.pivot_table(
                index=time_column,
                columns=name_column,
                values=target,
                aggfunc="count",
                fill_value=0,
            )
            .astype(bool)
            .astype(int)
        )
        data_names[target] = target_column
        return data_names.reset_index().drop(time_column, axis=1).drop_duplicates()
