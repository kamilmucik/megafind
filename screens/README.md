A2 = "Jakś sobie tekst"

=FRAGMENT.TEKSTU(KOMÓRKA;LICZBA_POCZĄTKOWA;LICZBAZNAKÓW)
=FRAGMENT.TEKSTU(A2;2;3) -> "akś"

=CZY.PARZYSTE(LICZBA)
=CZY.PARZYSTE(2) -> PRAWDA

TEST_LOGICZNY = PRADWA | FAŁSZ
=JEŻELI(TEST_LOGICZNY;"JESLI_PRADA";"JESLI_FAUSZ")
=JEŻELI(CZY.PARZYSTE(2);"tak";"nie") -> tak

TABLICA_1 = 1,2,3
TABLICA_2 = 4,5,6
WYNIK -> 1*4 + 2*5 + 3*6 = 32
ważne żeby tablice były równej długości

=SUMA.ILOCZYNÓW(TABLICA_1;TABLICA_2;...)
=SUMA.ILOCZYNÓW(E7:I7;E8:I8)

=MODUŁ.LICZBY(LICZBA)
=MODUŁ.LICZBY(-22) -> 22
zwraca wartość bezwzględną liczby

=ŚREDNIA(C2:C201) 
średnia art

=SUMA.ILOCZYNÓW(D4:J4;$D$3:$J$3)/SUMA($D$3:$J$3)
średnia ważona

=JEŻELI(FRAGMENT.TEKSTU(A16;1;2)="90";B16*C16;"BRAK WYSYŁKI")
jesli coś 

=WYSZUKAJ.PIONOWO(102;A2:D11;2;)
szukane ; tabela ; index tabeli ; T|F -> przybliżone|dokładne dopasowanie

pamiętaj jeszcze o średniej ważonej, tu masz wzór

=SUMA.ILOCZYNÓW(D4:J4;$D$3:$J$3)/SUMA($D$3:$J$3)