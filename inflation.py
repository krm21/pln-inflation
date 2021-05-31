import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


class Inflation:
    def __init__(self):
        self.gusurl = 'https://stat.gov.pl/obszary-tematyczne/ceny-handel/wskazniki-cen/wskazniki-cen-towarow-i-uslug-konsumpcyjnych-pot-inflacja-/miesieczne-wskazniki-cen-towarow-i-uslug-konsumpcyjnych-od-1982-roku/'

        self.df = pd.read_html(self.gusurl)[0] # only one element on the list

        self._sanitize_dataframe()

    def _sanitize_dataframe(self):
        self.df.columns = self.df.columns.droplevel() # useless multiindex
        self.df = self.df[self.df['Wyszczególnienie'] == 'Poprzedni  miesiąc = 100'] # select one of the tables
        self.df = self.df.iloc[:, 1:] # get rid of 'poprzedni miesiąc = 100' column
        self.df.iloc[:, 1:] = self.df.iloc[:, 1:].astype('float64') 
        self.df.iloc[:, 1:] = self.df.iloc[:, 1:].apply(lambda x: x/1000) # normalize
        self.df['Rok'] = self.df['Rok'].str.strip('abcde') # get rid of alphabetical indices
        self.df.iloc[:, 0] = self.df.iloc[:, 0].astype('int64')
        self.df = self.df.set_index('Rok')
        self.df.columns = range(1, 13) # change columns from roman numerals to arabic

    def _get_product(self, month, year):
        self.flat_df = self.df[self.df.columns[::-1]].T.unstack()
        prod = 1
        prod *= self.flat_df.loc[year, :month].prod()
        if year+1 <= self.flat_df.index[0][0]:
            prod *= self.flat_df.loc[:year+1].prod()
        return prod

    def convert_to_past(self, today_amount, month, year):
        return round(today_amount / self._get_product(month, year), 2)

    def convert_to_today(self, past_amount, month, year):
        return round(past_amount * self._get_product(month, year), 2)

    def get_json(self):
        return self.df.T.to_json()

if __name__ == '__main__':
    inf = Inflation()
    print(inf.convert_to_past(500, 10, 2015))
